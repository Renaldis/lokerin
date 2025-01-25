import { Link, useLocation } from "react-router-dom";
import LokerLogo from "../../assets/siniLoker2.png";

function Navbar({ ...props }) {
  const location = useLocation();
  return (
    <nav className="border-b border-slate-300" {...props}>
      <div className="flex items-center justify-between px-6 py-1">
        <div className="flex items-center gap-2">
          <img src={LokerLogo} alt="Logo-Loker" className="w-12" />
          <span className="text-xl font-bold text-sky-600 dark:text-white">
            Lokerin
          </span>
        </div>
        <div className="flex items-center gap-10">
          <Link
            to={"/"}
            className={`text-base font-semibold ${
              location.pathname == "/" ? "text-blue-600" : ""
            }`}
          >
            Beranda
          </Link>
          <Link
            to={"/job-vacancy"}
            className={`text-base font-semibold ${
              location.pathname == "/job-vacancy" ? "text-blue-600" : ""
            }`}
          >
            Lowongan
          </Link>
          <Link
            to={"/about"}
            className={`text-base font-semibold ${
              location.pathname == "/about" ? "text-blue-600" : ""
            }`}
          >
            Tentang Kami
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span>Renaldi Saputra</span>
          <img
            src="https://media.istockphoto.com/id/483627817/photo/showing-off-his-pearly-whites.jpg?s=612x612&w=0&k=20&c=gk6aVVGp52YFx1ZzPVQplGc7JL5zkrfxQTuLjIn2RU8="
            alt="man-smile"
            className="w-16"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
