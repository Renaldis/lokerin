import { useNavigate } from "react-router-dom";
export default function ErrNotFound() {
  const navigate = useNavigate();
  return (
    <section
      id="not-found"
      className="gap-5 flex border h-screen items-center justify-center"
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-6xl text-red-600 font-extrabold">404</h1>
        <h1 className="text-4xl text-black">Page Not Found</h1>
        {/* <i className="text-6xl text-red-500 fas fa-smile"></i> */}
        <h1 className="text-2xl text-slate-600">
          "The page you requested could not be found"
        </h1>
        <button
          className="bg-blue-600 px-8 py-2 rounded-md text-white hover:bg-blue-800 mt-5"
          onClick={() => navigate("/")}
        >
          Kembali ke beranda
        </button>
      </div>
    </section>
  );
}
