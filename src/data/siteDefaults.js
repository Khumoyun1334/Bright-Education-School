import { courses } from "./courses";
import { team } from "./team";
import { news } from "./news";
import { results, parentQuotes, monthlyProgress, courseProgress } from "./results";
import { gallery } from "./gallery";
import { documents } from "./documents";
import { admins } from "./contacts";

export const defaultStories = [
  { name: "Madina onasi", result: "Ingliz tili · 8 oy", quote: "Farzandim darsga o‘zi xursand bo‘lib boradi, natijalarini esa har oy ko‘rib turamiz.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85", video: "" },
  { name: "Javohirning otasi", result: "Matematika · 6 oy", quote: "Eng yoqqan tomoni — tartib va ustozning ota-ona bilan doimiy aloqasi.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85", video: "" },
  { name: "Sarvinoz", result: "IELTS · 7.0", quote: "Reja aniq bo‘lgani uchun qayerda xato qilayotganimni va qanday o‘sayotganimni bildim.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85", video: "" },
];

export const defaultStats = [
  { value: "7 500+", label: "bitiruvchi", note: "shu kungacha ta’lim olgan", icon: "users" },
  { value: "7 000+", label: "sertifikat", note: "o‘quvchilarga topshirilgan", icon: "award" },
  { value: "6", label: "ta’lim yo‘nalishi", note: "har xil yosh va maqsadlar uchun", icon: "book" },
  { value: "Doimiy", label: "natija tahlili", note: "o‘sishni kuzatish tizimi", icon: "trend" },
];

export const defaultContent = {
  settings: {
    centerName: "Bright Education School",
    address: "Rishton shahri",
    addressTitle: "Rishton shahrida sizni kutamiz.",
    mapQuery: "Rishton Tibbiyot Texnikumi",
    telegramUrl: import.meta.env.VITE_TELEGRAM_URL || "",
    instagramUrl: import.meta.env.VITE_INSTAGRAM_URL || "",
    heroImage: "/bright-hero-classroom.png",
    heroBadge: "2026 qabul ochiq",
    heroTitleStart: "Mustahkam bilim,",
    heroTitleAccent: "ishonchli",
    heroTitleEnd: "kelajak.",
    heroLead: "Farzandingiz tajribali ustozlar, tartibli muhit va aniq o‘quv rejasi bilan o‘z salohiyatini to‘liq namoyon qilsin.",
  },
  courses,
  team,
  news,
  results,
  parentQuotes: parentQuotes.map((text) => ({ text })),
  monthlyProgress,
  courseProgress,
  gallery,
  documents,
  admins,
  stories: defaultStories,
  stats: defaultStats,
};
