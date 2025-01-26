import { useContext } from "react";
import { useGlobalContext } from "../../../context/useGlobalContext";

export default function Dashboard() {
  const { auth } = useContext(useGlobalContext);
  const { user } = auth;
  return (
    <section
      id="dashboard"
      className="flex justify-center h-[100%] bg-slate-300 shadow-md rounded-md"
    >
      <div className="welcome flex flex-col justify-center items-center">
        <h1 className="text-2xl">Selamat Datang {user}</h1>
        <h1 className="text-2xl font-bold text-center">
          Halaman Dashboard Admin
        </h1>
      </div>
    </section>
  );
}
