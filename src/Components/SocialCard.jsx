export default function SocialCard({ icon, title, desc }) {
  return (
    <div
      className="
        bg-white rounded-2xl p-6 border border-gray-200
        transition-all duration-300
        hover:shadow-md hover:border-gray-300
      "
    >
      <div className="text-2xl text-blue-600 mb-4 transition-colors duration-300 hover:text-blue-700">
        {icon}
      </div>

      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
