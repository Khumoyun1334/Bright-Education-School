import { whyUs } from "../data/whyUs";

const WhyUs = () => {
  return (
    <section id="about" className="py-20 max-w-7xl mx-auto px-5">
      <h2 className="text-3xl font-bold text-center mb-12">
        Nega Bright Education?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {whyUs.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:-translate-y-3 transition"
          >
            <img
              src={item.img}
              alt={item.title}
              className="h-40 w-full object-cover rounded-xl mb-5"
            />
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
