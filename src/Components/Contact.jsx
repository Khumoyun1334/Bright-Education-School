const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50 px-5">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <form className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Biz siz bilan bog‘lanamiz</h2>
          <input className="w-full mb-4 p-3 border rounded-xl" placeholder="Ism" />
          <input className="w-full mb-4 p-3 border rounded-xl" placeholder="Telefon" />
          <textarea className="w-full mb-4 p-3 border rounded-xl" placeholder="Xabar" />
          <button className="w-full bg-blue-600 text-white py-3 rounded-full">
            Yuborish
          </button>
        </form>

        <iframe
          className="w-full h-full rounded-2xl"
          src="https://www.google.com/maps?q=Rishton%20Tibbiyot%20Texnikumi&output=embed"
        />
      </div>
    </section>
  );
};

export default Contact;
