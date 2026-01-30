import { FaGraduationCap, FaCertificate } from "react-icons/fa";

export default function StatsCards() {
  return (
    <div className="max-w-full md:max-w-[85%] mx-auto px-4 mb-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      
      {/* 1-card */}
      <div className="bg-white rounded-3xl p-8 flex items-center justify-between shadow-sm">
        <div>
          <h2 className="text-4xl font-bold text-black">7500+</h2>
          <p className="mt-2 text-gray-600">
            Shu kungacha bitirgan o‘quvchilar
          </p>
        </div>
        <div className="text-blue-500 text-6xl">
          <FaGraduationCap />
        </div>
      </div>

      {/* 2-card */}
      <div className="bg-white rounded-3xl p-8 flex items-center justify-between shadow-sm">
        <div>
          <h2 className="text-4xl font-bold text-black">7000+</h2>
          <p className="mt-2 text-gray-600">
            Sertifikat olgan o‘quvchilar
          </p>
        </div>
        <div className="text-yellow-500 text-6xl">
          <FaCertificate />
        </div>
      </div>

    </div>

    </div>
    
  );
}
