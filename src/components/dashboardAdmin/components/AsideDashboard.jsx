import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../context/useGlobalContext";

import LogoSiniLoker from "/assets/siniLoker2.png";

export default function AsideDashboard({ ...props }) {
  const { global } = useContext(useGlobalContext);
  const { handleConfirmLogout } = global;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div {...props}>
      <div
        onClick={() => navigate("/")}
        className="flex flex-col items-center cursor-pointer pt-4"
      >
        <img
          src={LogoSiniLoker}
          className="mr-3 w-10 h-10 sm:w-16 sm:h-16 md:w-12 md:h-12"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-bold text-slate-200 dark:text-white hidden md:block">
          Lokerin
        </span>
      </div>
      <div className="w-[90%] mx-auto mt-5">
        <div className="flex flex-col items-start gap-2 text-slate-400 font-medium">
          <div
            className={`w-full p-2 hover:bg-slate-700 hover:text-white rounded-md cursor-pointer ${
              location.pathname === "/dashboard" && "bg-slate-700 text-white"
            } flex items-center gap-2 justify-center md:justify-start`}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <i className="fas fa-home"></i>
            <h1 className="hidden md:block">Dashboard</h1>
          </div>
          <div
            className={`w-full p-2 hover:bg-slate-700 hover:text-white rounded-md cursor-pointer ${
              location.pathname === "/dashboard/list-job-vacancy" &&
              "bg-slate-700 text-white"
            } flex items-center gap-2 justify-center md:justify-start`}
            onClick={() => navigate("/dashboard/list-job-vacancy")}
          >
            <i className="fas fa-list"></i>
            <h1 className="hidden md:block">List Data Perusahaan</h1>
          </div>
          <div
            className={`w-full p-2 hover:bg-slate-700 hover:text-white rounded-md cursor-pointer ${
              location.pathname === "/dashboard/list-job-vacancy/create" &&
              "bg-slate-700 text-white"
            } flex items-center gap-2 justify-center md:justify-start`}
            onClick={() => navigate("/dashboard/list-job-vacancy/create")}
          >
            <i className="fas fa-plus-square"></i>
            <h1 className="hidden md:block">Tambah Data Baru</h1>
          </div>
          <div
            className={`w-full p-2 hover:bg-slate-700 hover:text-white rounded-md cursor-pointer ${
              location.pathname === "/dashboard/profile" &&
              "bg-slate-700 text-white"
            } flex items-center gap-2 justify-center md:justify-start`}
            onClick={() => navigate("/dashboard/profile")}
          >
            <i className="fas fa-user"></i>
            <h1 className="hidden md:block">Profil</h1>
          </div>
          <div
            className={`w-full p-2 hover:text-red-800 rounded-md cursor-pointer flex items-center gap-2 text-red-700 justify-center md:justify-start`}
            onClick={handleConfirmLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
            <h1 className="hidden md:block">Keluar</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
