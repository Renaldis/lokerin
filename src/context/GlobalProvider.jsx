import { useGlobalContext } from "./useGlobalContext";
import { useEffect, useState } from "react";
import { jobData } from "../jobData";

function GlobalProvider(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAdminOpen, setIsMenuAdminOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("jobs")) {
      localStorage.setItem("jobs", JSON.stringify(jobData));
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("jobs")) {
      const dataJobs = localStorage.getItem("jobs");
      setJobs(JSON.parse(dataJobs));
    }
  }, []);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData?.username) {
      setAuthenticated(true);
      setUser(authData.username);
    } else {
      setUser(null);
    }
  }, [authenticated]);
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleConfirmLogout = () => {
    setIsMenuOpen(false);
    setIsMenuAdminOpen(false);
    setIsModalOpen(!isModalOpen);
  };
  const handleLogout = () => {
    setIsModalOpen(!isModalOpen);
    setIsMenuAdminOpen(false);
    localStorage.removeItem("auth");
    setAuthenticated(false);
  };
  const auth = { user, setUser, authenticated, setAuthenticated };
  const global = {
    handleConfirmLogout,
    handleLogout,
    isModalOpen,
    setIsModalOpen,
    setIsMenuAdminOpen,
    isMenuAdminOpen,
    setIsMenuOpen,
    isMenuOpen,
  };
  return (
    <useGlobalContext.Provider value={{ auth, global }}>
      {props.children}
    </useGlobalContext.Provider>
  );
}

export default GlobalProvider;
