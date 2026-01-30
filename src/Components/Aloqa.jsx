import { useState } from "react";

function Aloqa() {
  const [loading, setLoading] = useState(false);

  const sendToTelegram = (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const surname = e.target.surname.value.trim();
    const phone = e.target.phone.value.trim();
    const messageText = e.target.message.value.trim();

    // 🔴 Bo‘sh inputni tekshirish
    if (!name || !surname || !phone || !messageText) {
      alert("Iltimos, barcha maydonlarni to‘ldiring ❗");
      return;
    }

    setLoading(true);

    const text = `
📩 YANGI MUROJAAT

👤 Ism: ${name}
👤 Familiya: ${surname}
📞 Telefon: ${phone}
📝 Xabar: ${messageText}
    `;

    fetch("https://api.telegram.org/bot7973094095:AAHcXetq9Hd2L-zhVS6G0sr7RB2mq2DZr6Y/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: "7015907384",
        text: text,
      }),
    })
      .then(() => {
        alert("Xabar yuborildi ✅");
        e.target.reset();
      })
      .catch(() => {
        alert("Xatolik yuz berdi ❌");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section id="aloqa" className="bg-gray-50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8">

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex-1">
          <h2 className="text-3xl font-bold mb-6">Biz bilan bog‘laning</h2>

          <form onSubmit={sendToTelegram} className="flex flex-col gap-4">
            <input name="name" placeholder="Ismingiz" className="border p-3 rounded" />
            <input name="surname" placeholder="Familyangiz" className="border p-3 rounded" />
            <input name="phone" placeholder="Telefon raqamingiz" className="border p-3 rounded" />
            <textarea
              name="message"
              placeholder="Murojatingiz..."
              className="border p-3 rounded h-32"
            />

            <button
              disabled={loading}
              className={`py-3 rounded-full text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Yuborilmoqda..." : "Yuborish"}
            </button>
          </form>
        </div>

        {/* MAP */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex-1">
          <iframe
            src="https://www.google.com/maps?q=Rishton%20Tibbiyot%20Texnikumi&output=embed"
            className="w-full h-full"
          />
        </div>

      </div>
    </section>
  );
}

export default Aloqa;