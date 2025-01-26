import { useGlobalContext } from "./useGlobalContext";
import { useEffect, useState } from "react";
import { jobData } from "../jobData";

function GlobalProvider(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [user, setUser] = useState(null);
  const [userImg, setUserImg] = useState(null);
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
    if (fetchStatus === true) {
      const authData = JSON.parse(localStorage.getItem("auth"));
      if (authData?.fullName) {
        setAuthenticated(true);
        setUser(authData.fullName);
        setUserImg(authData.image_url);
      } else {
        setUser(null);
        setUserImg(null);
      }
      setFetchStatus(false);
    }
  }, [authenticated, fetchStatus, setFetchStatus]);
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
  console.log(fetchStatus);
  const auth = {
    user,
    setUser,
    userImg,
    setUserImg,
    authenticated,
    setAuthenticated,
  };
  const global = {
    isModalOpen,
    setIsModalOpen,
    setIsMenuAdminOpen,
    isMenuAdminOpen,
    setIsMenuOpen,
    isMenuOpen,
    jobs,
    setFetchStatus,
  };
  return (
    <useGlobalContext.Provider value={{ auth, global }}>
      {props.children}
    </useGlobalContext.Provider>
  );
}

export default GlobalProvider;
