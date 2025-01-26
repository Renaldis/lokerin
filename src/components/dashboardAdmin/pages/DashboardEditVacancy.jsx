import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { useNavigate } from "react-router-dom";

export default function DashboardEditVacancy() {
  const navigate = useNavigate();
  const { global } = useContext(useGlobalContext);
  const { setFetchStatus } = global;
  const { id } = useParams();
  const [input, setInput] = useState({
    title: "",
    company_name: "",
    company_city: "",
    company_image_url: "",
    salary_min: "",
    salary_max: "",
    job_description: "",
    job_qualification: "",
    job_type: "",
    job_tenure: "",
    job_status: "",
  });
  const handleUpdate = (e) => {
    e.preventDefault();

    const localJobs = JSON.parse(localStorage.getItem("jobs"));

    const updatedJobs = localJobs.map((job) =>
      job._id == id ? { ...job, ...input } : job
    );

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setFetchStatus(true);
    navigate("/dashboard/list-job-vacancy");
  };
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({ ...input, [name]: value });
  };
  useEffect(() => {
    const localJobs = JSON.parse(localStorage.getItem("jobs"));
    const idJob = id;

    const jobFind = localJobs.find((jobs) => jobs._id == idJob);
    if (jobFind) {
      setInput({
        title: jobFind.title || "",
        company_name: jobFind.company_name || "",
        company_city: jobFind.company_city || "",
        company_image_url: jobFind.company_image_url || "",
        salary_min: parseInt(jobFind.salary_min) || "",
        salary_max: parseInt(jobFind.salary_max) || "",
        job_description: jobFind.job_description || "",
        job_qualification: jobFind.job_qualification || "",
        job_type: jobFind.job_type || "",
        job_tenure: jobFind.job_tenure || "",
        job_status: jobFind.job_status || "",
      });
    }
  }, [id]);
  return (
    <section id="dashboardEdit" className="p-4 h-[100%]">
      <div className="p-3 md:p-5 w-[90%] mx-auto border flex flex-col items-center border-gray-400 text-white shadow-md bg-slate-700 rounded-md ">
        <h1 className="text-xl md:text-2xl">Buat Lowongan Kerja Baru</h1>
        <form className="py-2 w-full" onSubmit={handleUpdate}>
          <div className="flex flex-col gap-1 py-1 ">
            <label>Job Title</label>
            <input
              type="text"
              className="rounded-md border-slate-300 text-slate-600 bg-white py-2 px-2"
              name="title"
              placeholder="Input Job Title"
              value={input.title}
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label>Company Name</label>
            <input
              type="text"
              className="rounded-md border-slate-300 text-slate-600 bg-white py-2 px-2"
              name="company_name"
              placeholder="Input Companye Name"
              value={input.company_name}
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label>Company City</label>
            <input
              type="text"
              className="rounded-md border-slate-300 text-slate-600 bg-white py-2 px-2"
              name="company_city"
              placeholder="ex. jakarta"
              value={input.company_city}
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label>Company Image</label>
            <input
              type="text"
              className="rounded-md border-slate-300 text-slate-600 bg-white py-2 px-2"
              placeholder="Input URL Logo"
              name="company_image_url"
              value={input.company_image_url}
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label>Salary Minimum</label>
            <input
              type="number"
              className="rounded-md border-slate-300 text-slate-600 bg-white py-2 px-2"
              name="salary_min"
              min={9000000}
              placeholder="Rp 9000.000"
              value={input.salary_min}
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label>Salary Maximum</label>
            <input
              type="number"
              className="rounded-md border-slate-300 text-slate-600 bg-white py-2 px-2"
              name="salary_max"
              value={input.salary_max}
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label>Job Description</label>
            <textarea
              className="rounded-md border-slate-300 text-slate-600 bg-white py-2 px-2"
              name="job_description"
              value={input.job_description}
              onChange={handleInput}
              required
            ></textarea>
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label>Job Kualification</label>
            <input
              type="text"
              className="rounded-md border-slate-300 text-slate-600 bg-white py-2 px-2"
              name="job_qualification"
              value={input.job_qualification}
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label>Job Type</label>
            <input
              type="text"
              className="rounded-md border-slate-300 text-slate-600 bg-white py-2 px-2"
              name="job_type"
              placeholder="ex. hybrid/on-site/remote"
              value={input.job_type}
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label>Job Tenure</label>
            <input
              type="text"
              className="rounded-md border-slate-300 text-slate-600 bg-white py-2 px-2"
              name="job_tenure"
              placeholder="ex. contract/full-time/temporary/permanent"
              value={input.job_tenure}
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label>Job Status</label>
            <input
              type="number"
              className="rounded-md border-slate-300 text-slate-600 bg-white py-2 px-2"
              name="job_status"
              placeholder="0 = closed, 1 = open"
              min={0}
              max={1}
              value={input.job_status}
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex flex-col gap-1 pt-4">
            <button
              type="submit"
              className="bg-blue-500 py-2 rounded-lg hover:bg-blue-800 hover:text-slate-50 transition-all duration-200"
            >
              Buat Lowongan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
