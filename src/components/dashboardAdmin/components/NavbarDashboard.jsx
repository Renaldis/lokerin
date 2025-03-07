import { useContext, useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../../button/Button";
import ConfirmModal from "../../popupConfirm/Confirm";
import LokerLogo from "/assets/siniLoker2.png";

export default function NavbarDashboard({ pageName, ...props }) {
  const { global, auth } = useContext(useGlobalContext);
  const { user, userImg } = auth;
  const { setIsMenuAdminOpen, isMenuAdminOpen, isModalOpen } = global;

  const toggleMenuAdmin = () => {
    setIsMenuAdminOpen(!isMenuAdminOpen);
    isModalOpen && setIsMenuAdminOpen(false);
  };

  return (
    <nav className="border-b border-slate-300" {...props}>
      <div className="flex items-center justify-between px-6 py-3">
        <span className="md:text-base lg:text-xl font-semibold text-slate-700 shadow-sm border border-slate-800 p-2 rounded-lg text-sm">
          {pageName}
        </span>

        {/* Profile */}
        <div className="lg:flex items-center gap-2">
          {user ? (
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleMenuAdmin}
            >
              <span>{user}</span>
              <img
                src={userImg}
                alt="man-smile"
                className="ms-2 w-12 rounded-full aspect-square object-fill"
              />
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 bg-blue-600 text-slate-100 rounded-lg hover:bg-blue-900 font-semibold"
            >
              Masuk
            </Link>
          )}
        </div>
      </div>

      {/* admin menu dropdown */}
      <div
        className={`absolute right-0 ${
          location.pathname == "/dashboard/list-job-vacancy"
            ? "block"
            : "hidden"
        } md:hidden`}
      >
        {isMenuAdminOpen && (
          <div className="relative px-6 bg-white border border-slate-300 w-52 z-50">
            <Link
              to="/dashboard"
              className={`block text-base font-semibold py-2 text-slate-600 hover:text-slate-900`}
            >
              Dashboard Admin
            </Link>
          </div>
        )}
      </div>
      {isModalOpen && <ConfirmModal action="Logout"></ConfirmModal>}
    </nav>
  );
}
