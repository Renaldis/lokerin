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
    if (fetchStatus === true) {
      if (localStorage.getItem("jobs")) {
        const dataJobs = localStorage.getItem("jobs");
        setJobs(JSON.parse(dataJobs));
      }
      setFetchStatus(false);
    }
  }, [fetchStatus]);

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

  function formatSalaryRange(salary_min, salary_max) {
    const formatSalary = (salary) => {
      if (salary >= 1000000) {
        return `${(salary / 1000000).toFixed(1)} juta`;
      } else if (salary >= 1000) {
        return `${(salary / 1000).toFixed(0)} ribu`;
      } else {
        return salary;
      }
    };

    // Menggunakan formatSalary untuk salary_min dan salary_max
    const minSalary = formatSalary(salary_min);
    const maxSalary = formatSalary(salary_max);

    return `Rp ${minSalary} - ${maxSalary}`;
  }
  function timeElapsed(createdAt) {
    const now = new Date();
    const createdTime = new Date(createdAt);
    const elapsedMs = now - createdTime;

    const seconds = Math.floor(elapsedMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} tahun yang lalu`;
    } else if (months > 0) {
      return `${months} bulan yang lalu`;
    } else if (days > 0) {
      return `${days} hari yang lalu`;
    } else if (hours > 0) {
      return `${hours} jam yang lalu`;
    } else if (minutes > 0) {
      return `${minutes} menit yang lalu`;
    } else {
      return `Baru saja`;
    }
  }
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
    setJobs,
    formatSalaryRange,
    timeElapsed,
  };
  return (
    <useGlobalContext.Provider value={{ auth, global }}>
      {props.children}
    </useGlobalContext.Provider>
  );
}

export default GlobalProvider;
