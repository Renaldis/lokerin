import { useContext, useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { useNavigate } from "react-router-dom";

export default function DashboardListJob() {
  const navigate = useNavigate();
  const { global } = useContext(useGlobalContext);
  const { setFetchStatus } = global;

  const [jobs, setJobs] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("jobs"));
    setJobs(data);
  }, []);

  const [inputSearch, setInputSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleSelectItemsPage = (e) => {
    const { value } = e.target;
    setItemsPerPage(value);
  };

  const handleDelete = (id) => {
    const localJobs = JSON.parse(localStorage.getItem("jobs"));
    const updatedJobs = localJobs.filter((job) => job._id !== id);

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setFetchStatus(true);
  };

  // Calculate paginated data
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      localStorage.setItem("currentPage", newPage);
    }
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    setInputSearch(value);
    const jobsData = JSON.parse(localStorage.getItem("jobs")) || [];
    if (value.trim() === "") {
      setJobs(jobsData);
    } else {
      const filteredJobs = jobsData.filter(
        (job) =>
          job.title.toLowerCase().includes(value.toLowerCase()) ||
          job.company_name.toLowerCase().includes(value.toLowerCase())
      );
      setJobs(filteredJobs);
    }
  };
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = (e) => {
    if (e.target.value === "") {
      setIsFocus(false);
    }
  };
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold px-5 pt-5">
        List Data Perusahaan
      </h1>
      <form className="mt-5 ps-5 flex justify-between">
        <div>
          <select
            name="itemsPage"
            id=""
            className="border border-slate-400 px-2"
            onChange={handleSelectItemsPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <label htmlFor="#" className="ps-2">
            entries per page
          </label>
        </div>
        <div className="me-5">
          {isFocus && (
            <span className="w-[220px] text-xs text-slate-200 absolute top-27 right-5 transition-all bg-slate-950 rounded-lg p-2">
              Search by title job and company name
            </span>
          )}
          <input
            type="text"
            value={inputSearch}
            onChange={handleSearch}
            className="border rounded-sm border-slate-400"
            placeholder="search title job, company name"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </form>
      <div className="relative overflow-x-auto px-5 pb-5 pt-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-scroll">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Logo</th>
              <th className="px-6 py-3">Nama Perusahaan</th>
              <th className="px-6 py-3">Nama Pekerjaan</th>
              <th className="px-6 py-3">Gaji Minimum</th>
              <th className="px-6 py-3">Gaji Maksimum</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedJobs.length > 0 ? (
              paginatedJobs.map((job, idx) => {
                return (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  >
                    <td>
                      <img
                        src={job.company_image_url}
                        alt={job.company_name}
                        className="w-10 h-10 object-cover mx-auto"
                      />
                    </td>
                    <td className="px-6 py-4">{job.company_name}</td>
                    <td className="px-6 py-4">{job.title}</td>
                    <td className="px-6 py-4">{parseInt(job.salary_min)}</td>
                    <td className="px-6 py-4">{parseInt(job.salary_max)}</td>
                    <td
                      className={
                        job.job_status == 1
                          ? "text-green-500 font-semibold px-6 py-4"
                          : "text-red-500 font-semibold px-6 py-4"
                      }
                    >
                      {job.job_status == 1 ? "Open" : "Closed"}
                    </td>
                    <td>
                      <div className="flex flex-col gap-2 items-center">
                        <i
                          className="fas fa-edit text-cyan-600 dark:text-cyan-500 hover:text-cyan-800 cursor-pointer"
                          onClick={() => {
                            navigate(
                              `/dashboard/list-job-vacancy/edit/${job._id}`
                            );
                          }}
                        ></i>
                        <i
                          className="fas fa-trash text-red-600 hover:text-red-800 cursor-pointer"
                          onClick={() => {
                            handleDelete(job._id);
                          }}
                        ></i>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Tidak ada data Tersedia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center px-5 py-3">
        Page {currentPage} of {totalPages} <br />
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={`px-2 py-1 border border-slate-300 rounded-sm cursor-pointer ${
                  currentPage === page
                    ? "bg-blue-600 hover:bg-blue-800 text-white"
                    : "bg-slate-200"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
          <button
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
