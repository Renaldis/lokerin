import { useContext, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/useGlobalContext";
import { useParams } from "react-router-dom";
import iconLocation from "/assets/location.png";
import iconFolder from "/assets/folder.png";
import { useNavigate } from "react-router-dom";

export default function JobVacancyDetail() {
  const navigate = useNavigate();
  const { global } = useContext(useGlobalContext);
  const { formatSalaryRange, timeElapsed } = global;
  const [jobs, setJobs] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const dataJobs = JSON.parse(localStorage.getItem("jobs"));

    const job = dataJobs.find((data) => data._id == id);
    setJobs(job);
  }, []);

  console.log(jobs);
  const handleApplyJob = () => {
    alert("Selamat Anda berhasil mendaftar");
    navigate("/");
  };

  if (!jobs) {
    return <div>Loading...</div>;
  }
  return (
    <section id="jobVacancyDetail" className="bg-slate-50 p-10">
      <div className="flex flex-col-reverse md:flex-row flex-wrap justify-between">
        <div className="card w-[100%] md:w-[60%] bg-white border border-slate-200 rounded-md shadow-sm p-5">
          <div className="flex justify-center">
            <img
              src={jobs.company_image_url}
              alt={jobs.company_name}
              className="w-36 h-36 md:hidden p-5"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="font-bold text-base mb-2 md:mb-0 md:text-2xl">
              {jobs.title}
            </h1>
            <button
              onClick={handleApplyJob}
              className="cursor-pointer py-1 px-2 md:py-2 md:px-6 bg-blue-600 rounded-md text-white hover:bg-blue-800 hidden md:block"
            >
              Lamar Pekerjaan
            </button>
          </div>
          <div className="flex flex-wrap gap-4 my-1">
            <div className="flex items-center gap-1">
              <i className="fas fa-building text-slate-500"></i>
              <p className="text-blue-600">{jobs.company_name}</p>
            </div>
            <div className="flex items-center gap-1">
              <i className="fas fa-calendar-day text-slate-500"></i>
              <p className="text-slate-600 font-normal">
                Sekitar {timeElapsed(jobs.createdAt)}
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap justify-between">
              <div className="items-center gap-1">
                <div className="flex items-center">
                  <img src={iconLocation} alt="location" className="w-5" />
                  <div className="ml-1">
                    <p className="mt-5">Lokasi</p>
                    <p className="text-slate-600 font-normal">
                      {jobs.company_city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src={iconFolder} alt="location" className="w-5" />
                  <div className="ml-1">
                    <p className="mt-5">Fungsi</p>
                    <p className="text-slate-600 font-normal">{jobs.title}</p>
                  </div>
                </div>
              </div>
              <div className="items-center gap-1">
                <div className="flex items-center">
                  <img src={iconLocation} alt="location" className="w-5" />
                  <div className="ml-1">
                    <p className="mt-5">Tipe Pekerjaan</p>
                    <p className="text-slate-600 font-normal">
                      {jobs.job_type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src={iconFolder} alt="location" className="w-5" />
                  <div className="ml-1">
                    <p className="mt-5">Masa Kerja</p>
                    <p className="text-slate-600 font-normal">
                      {jobs.job_tenure}
                    </p>
                  </div>
                </div>
              </div>
              <div className="items-center gap-1">
                <div className="flex items-center">
                  <img src={iconFolder} alt="location" className="w-5" />
                  <div className="ml-1">
                    <p className="mt-5">Gaji Min - Maks</p>
                    <p className="text-slate-600 font-normal">
                      {formatSalaryRange(jobs.salary_min, jobs.salary_max)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center sm:justify-end">
              <button
                onClick={handleApplyJob}
                className="mt-3 py-1 px-2 md:py-2 md:px-6 bg-blue-600 rounded-md text-white hover:bg-blue-800 md:hidden"
              >
                Lamar Pekerjaan
              </button>
            </div>
          </div>
        </div>
        <div className="md:flex flex-col justify-center items-center bg-white border border-slate-200 rounded-md shadow-sm hidden md:w-2/6">
          <div className="flex items-center">
            <img
              src={jobs.company_image_url}
              alt={jobs.company_name}
              className="w-36 h-36 md:w-48 md:h-48 p-5"
            />
          </div>
          <div className="pb-10">
            <h1>{jobs.company_name}</h1>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold">Deskripsi</h1>
          <p>{jobs.job_description}</p>
        </div>
        <div>
          <h1 className="text-xl font-semibold">Kualifikasi</h1>
          <p>{jobs.job_qualification}</p>
        </div>
      </div>
    </section>
  );
}
