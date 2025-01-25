import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LokerLogo from "/public/assets/siniLoker2.png";

function Navbar({ ...props }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-b border-slate-300" {...props}>
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={LokerLogo} alt="Logo-Loker" className="w-12" />
          <span className="text-xl font-bold text-sky-600 dark:text-white">
            Lokerin
          </span>
        </div>

        {/* Hamburger Menu (Small Screens) */}
        <div className="lg:hidden ">
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-600 hover:text-sky-600 focus:outline-none cursor-pointer"
          >
            {isMenuOpen ? (
              <span className="text-xl font-bold">&#x2715;</span>
            ) : (
              <span className="text-xl font-bold">&#9776;</span>
            )}
          </button>
        </div>

        {/* Links (Large Screens) */}
        <div className="hidden lg:flex items-center gap-10">
          <Link
            to="/"
            className={`text-base font-semibold ${
              location.pathname === "/" ? "text-blue-600" : ""
            }`}
          >
            Beranda
          </Link>
          <Link
            to="/job-vacancy"
            className={`text-base font-semibold ${
              location.pathname === "/job-vacancy" ? "text-blue-600" : ""
            }`}
          >
            Lowongan
          </Link>
          <Link
            to="/about"
            className={`text-base font-semibold ${
              location.pathname === "/about" ? "text-blue-600" : ""
            }`}
          >
            Tentang Kami
          </Link>
        </div>

        {/* Profile */}
        <div className="hidden lg:flex items-center gap-2">
          {/* before login */}
          <a
            href=""
            className="px-6 py-2 bg-blue-600 text-slate-100 rounded-lg hover:bg-blue-900 font-semibold"
          >
            Masuk
          </a>
          {/* after login */}
          {/* <span>Renaldi Saputra</span>
          <img
            src="https://media.istockphoto.com/id/483627817/photo/showing-off-his-pearly-whites.jpg?s=612x612&w=0&k=20&c=gk6aVVGp52YFx1ZzPVQplGc7JL5zkrfxQTuLjIn2RU8="
            alt="man-smile"
            className="w-10 rounded-full"
          /> */}
        </div>
      </div>

      {/* Dropdown Menu (Small Screens) */}
      {isMenuOpen && (
        <div className="lg:hidden px-6 py-3 bg-white border-t border-slate-300">
          <Link
            to="/"
            className={`block text-base font-semibold py-2 ${
              location.pathname === "/" ? "text-blue-600" : ""
            }`}
          >
            Beranda
          </Link>
          <Link
            to="/job-vacancy"
            className={`block text-base font-semibold py-2 ${
              location.pathname === "/job-vacancy" ? "text-blue-600" : ""
            }`}
          >
            Lowongan
          </Link>
          <Link
            to="/about"
            className={`block text-base font-semibold py-2 ${
              location.pathname === "/about" ? "text-blue-600" : ""
            }`}
          >
            Tentang Kami
          </Link>
          <div className="flex items-center gap-2 mt-3">
            {/* before login */}

            {/* after login */}
            {/* <span>Renaldi Saputra</span>
            <img
              src="https://media.istockphoto.com/id/483627817/photo/showing-off-his-pearly-whites.jpg?s=612x612&w=0&k=20&c=gk6aVVGp52YFx1ZzPVQplGc7JL5zkrfxQTuLjIn2RU8="
              alt="man-smile"
              className="w-10 rounded-full"
            /> */}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
