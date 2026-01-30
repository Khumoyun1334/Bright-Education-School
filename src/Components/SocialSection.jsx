import {
  FaTelegramPlane,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import SocialCard from "./SocialCard";

export default function SocialSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[90%] md:max-w-[85%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT CARD */}
        <div className="bg-white rounded-2xl p-10 border border-gray-200">
          <h2 className="text-3xl font-bold mb-4 leading-snug">
            Bizni ijtimoiy <br /> tarmoqlarda ham kuzating
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Bright Education School yangiliklari, e’lonlar va
            foydali kontentlarni ijtimoiy tarmoqlarimiz orqali
            kuzatib boring.
          </p>
        </div>

        {/* RIGHT CARDS */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SocialCard
            icon={<FaTelegramPlane />}
            title="Telegram kanalimiz"
            desc="Yangiliklardan birinchi bo‘lib xabardor bo‘ling"
          />
          <SocialCard
            icon={<FaInstagram />}
            title="Instagram sahifamiz"
            desc="Dars jarayonlari va hayotdan lavhalar"
          />
          <SocialCard
            icon={<FaLinkedinIn />}
            title="LinkedIn sahifamiz"
            desc="Professional yo‘nalish va yutuqlar"
          />
          <SocialCard
            icon={<FaYoutube />}
            title="YouTube kanalimiz"
            desc="Video darslar va foydali kontentlar"
          />
        </div>
      </div>
    </section>
  );
}
