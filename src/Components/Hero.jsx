const Hero = () => {
  return (
    <header
      id="home"
      className="min-h-screen bg-cover bg-center flex items-center pt-24"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15,23,42,.7),rgba(15,23,42,.7)),url(https://images.unsplash.com/photo-1523240795612-9a054b0db644)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 text-white">
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-5">
          Kelajagingizni{" "}
          <span className="text-blue-500">Bright Education</span> bilan boshlang
        </h1>

        <p className="text-gray-200 max-w-xl mb-8">
          Ingliz tili, IT, Matematika va IELTS yo‘nalishlarida zamonaviy ta’lim.
        </p>

        <div className="flex gap-4">
          <a href="#courses" className="bg-blue-600 px-6 py-3 rounded-full font-bold">
            Kurslarimiz
          </a>
          <a href="#aloqa" className="border border-white px-6 py-3 rounded-full font-bold">
            Bog‘lanish
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
