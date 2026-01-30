import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-slate-900/70 backdrop-blur z-50">
      
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          Bright<span className="text-blue-500">Education</span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-8 text-gray-200">
          <a href="#home" className="hover:text-blue-500">Bosh Sahifa</a>
          <a href="#about" className="hover:text-blue-500">Biz haqimizda</a>
          <a href="#courses" className="hover:text-blue-500">Kurslar</a>
          <a href="#contact" className="hover:text-blue-500">Aloqa</a>
        </div>

        {/* DESKTOP BTN */}
        <a
          href="#contact"
          className="hidden md:inline-block bg-blue-600 px-5 py-2 rounded-full text-white font-bold"
        >
          Bog‘lanish
        </a>

        {/* BURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-3xl"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/70 backdrop-blur px-5 pb-6 space-y-4 text-gray-200">
          <a onClick={() => setOpen(false)} href="#home" className="block hover:text-blue-500">
            Bosh Sahifa
          </a>
          <a onClick={() => setOpen(false)} href="#about" className="block hover:text-blue-500">
            Biz haqimizda
          </a>
          <a onClick={() => setOpen(false)} href="#courses" className="block hover:text-blue-500">
            Kurslar
          </a>
          <a onClick={() => setOpen(false)} href="#contact" className="block hover:text-blue-500">
            Aloqa
          </a>

          <a
            href="#aloqa"
            className="block text-center bg-blue-600 py-2 rounded-full text-white font-bold"
          >
            Bog‘lanish
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
