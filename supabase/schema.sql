-- Bright Education admin panel bazasi.
-- Supabase Dashboard > SQL Editor ichida bir marta ishga tushiring.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.site_content (
  id text primary key default 'main',
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create table if not exists public.mandates (
  student_id text primary key,
  code text unique,
  student text not null,
  score integer not null check (score between 0 and 100),
  status text not null,
  course text not null,
  group_name text not null,
  exam_date text not null,
  created_at timestamptz not null default now()
);

-- Avvalgi sxemada mandat kaliti "code" edi. Quyidagi migratsiya mavjud
-- jadvallarga o‘quvchining shaxsiy ID ustunini ma’lumot yo‘qotmasdan qo‘shadi.
alter table public.mandates add column if not exists student_id text;
update public.mandates set student_id = code where student_id is null;
alter table public.mandates alter column student_id set not null;
create unique index if not exists mandates_student_id_key on public.mandates (student_id);

-- Har shanba o‘tkaziladigan haftalik mock test natijalari.
create table if not exists public.mock_results (
  id uuid primary key default gen_random_uuid(),
  student_full_name text not null check (char_length(student_full_name) between 5 and 100),
  student_search text not null,
  correct_answers integer not null check (correct_answers >= 0),
  total_questions integer not null check (total_questions > 0),
  course text not null,
  group_name text not null default '',
  mock_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mock_correct_not_above_total check (correct_answers <= total_questions),
  constraint mock_one_result_per_week unique (student_search, mock_date, course)
);

alter table public.mock_results drop constraint if exists mock_date_is_saturday;
alter table public.mock_results add constraint mock_date_is_saturday check (extract(isodow from mock_date) = 6);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  course text not null,
  preferred_time text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

-- Brauzer va telefon push-bildirishnoma obunalari. Endpoint va kalitlar
-- faqat server tomonidan ishlatiladi, public yoki oddiy userga ochilmaydi.
create table if not exists public.push_subscriptions (
  endpoint text primary key,
  p256dh text not null,
  auth text not null,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.admin_users where user_id = auth.uid()) $$;

alter table public.admin_users enable row level security;
alter table public.site_content enable row level security;
alter table public.mandates enable row level security;
alter table public.mock_results enable row level security;
alter table public.inquiries enable row level security;
alter table public.push_subscriptions enable row level security;

drop policy if exists "Public content is readable" on public.site_content;
create policy "Public content is readable" on public.site_content for select to anon, authenticated using (true);
drop policy if exists "Admins manage content" on public.site_content;
create policy "Admins manage content" on public.site_content for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admins view themselves" on public.admin_users;
create policy "Admins view themselves" on public.admin_users for select to authenticated using (user_id = auth.uid());
drop policy if exists "Admins manage mandates" on public.mandates;
create policy "Admins manage mandates" on public.mandates for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admins manage mock results" on public.mock_results;
create policy "Admins manage mock results" on public.mock_results for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admins manage inquiries" on public.inquiries;
create policy "Admins manage inquiries" on public.inquiries for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public reads site media" on storage.objects;
create policy "Public reads site media" on storage.objects for select to public using (bucket_id = 'site-media');
drop policy if exists "Admins upload site media" on storage.objects;
create policy "Admins upload site media" on storage.objects for insert to authenticated with check (bucket_id = 'site-media' and public.is_admin());
drop policy if exists "Admins update site media" on storage.objects;
create policy "Admins update site media" on storage.objects for update to authenticated using (bucket_id = 'site-media' and public.is_admin());
drop policy if exists "Admins delete site media" on storage.objects;
create policy "Admins delete site media" on storage.objects for delete to authenticated using (bucket_id = 'site-media' and public.is_admin());

grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
grant select, insert, update, delete on public.mandates, public.inquiries to authenticated;
grant select, insert, update, delete on public.mock_results to authenticated;
grant select on public.admin_users to authenticated;
revoke all on public.push_subscriptions from anon, authenticated;
grant all on public.push_subscriptions to service_role;

insert into public.site_content (id, content) values ('main', '{}'::jsonb) on conflict (id) do nothing;

-- Auth > Users ichida admin foydalanuvchi yaratgach, uning UUID qiymatini quyida yozib ishga tushiring:
-- insert into public.admin_users(user_id) values ('ADMIN_USER_UUID');
