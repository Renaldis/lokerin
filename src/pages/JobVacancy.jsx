import { useState, useEffect } from "react";
import { useContext } from "react";
import { useGlobalContext } from "../context/useGlobalContext";
import { useNavigate } from "react-router-dom";
import CardJobType from "../components/cardJobType/CardJobType";

function JobVacancy() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("jobs"));
    setJobs(data);
  }, []);

  const [inputSearch, setInputSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const handleSelectItemsPage = (e) => {
    const { value } = e.target;
    setItemsPerPage(value);
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
  return (
    <section id="jobVacanciesSection" className="my-5">
      <div className="p-2">
        <div className="flex flex-wrap gap-4 justify-center">
          {paginatedJobs.map((res, idx) => (
            <div
              key={idx}
              className="cardJobVacancies p-5 md:mb-0 md:w-[48%] lg:w-[32%] border border-slate-300 rounded-lg group hover:bg-sky-100 hover:border-sky-300 cursor-pointer transition-all duration-200"
            >
              <div className="header flex flex-wrap">
                <div className="header-image rounded-full w-20 h-20 bg-white shadow-md">
                  <img
                    src={res.company_image_url}
                    alt={res.company_name}
                    className="w-20 h-20 rounded-full object-fill"
                  />
                </div>
                <div className="header-title ml-4">
                  <h1 className="text-blue-700">
                    {res.company_name.length > 25
                      ? res.company_name.slice(0, 25) + "..."
                      : res.company_name}
                  </h1>
                  <h2 className="font-semibold">
                    {res.title.length > 25
                      ? res.title.slice(0, 25) + "..."
                      : res.title}
                  </h2>
                  <div className="text-slate-500">
                    <i className="fas fa-map-marker-alt" />
                    <span> {res.company_city}</span>
                  </div>
                </div>
              </div>
              <div className="job w-[100%] mx-auto">
                <CardJobType res={res} />
              </div>
              <div className="cardFooter mt-10">
                <hr className="border-[1px] border-slate-200 group-hover:border-sky-300 transition-all duration-200" />
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <i className="fas fa-money-bill-wave text-slate-600 group-hover:text-sky-500 transition-all duration-100" />
                    <span className="ml-3 group-hover:text-sky-400 transition-all duration-100">
                      {formatSalaryRange(res.salary_min, res.salary_max)}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/job-vacancies/${res._id}`)}
                    value={res._id}
                    className="px-2 py-2 ml-2 md:px-4 mdpy-2 bg-blue-500 rounded-lg text-sm text-slate-50 hover:bg-blue-800 transition-all duration-200"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center px-5 py-3 justify-center">
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
    </section>
  );
}

export default JobVacancy;
