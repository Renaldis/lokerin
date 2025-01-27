import { useContext, useEffect, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "../../context/useGlobalContext";

export default function JobHeroSection() {
  const { global } = useContext(useGlobalContext);
  const { setJobs, jobs } = global;

  const [inputSearch, setInputSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const dataJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(dataJobs);
  }, []);
  const uniqueCity = jobs
    .map((item) => item.company_city)
    .filter((value, index, self) => self.indexOf(value) === index);

  const uniqueName = jobs
    .map((item) => item.company_name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const handleChangeInputSearch = (e) => {
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

  const handleCityChange = (e) => {
    const { value } = e.target;
    setSelectedCity(value);

    const jobsData = JSON.parse(localStorage.getItem("jobs")) || [];
    if (value.trim() == "semua") {
      setJobs(jobsData);
    } else {
      const filteredJobs = jobsData.filter((job) =>
        job.company_city.toLowerCase().includes(value.toLowerCase())
      );
      setJobs(filteredJobs);
    }
  };
  const handleCompanyNameChange = (e) => {
    const { value } = e.target;
    setSelectedCompanyName(value);

    const jobsData = JSON.parse(localStorage.getItem("jobs")) || [];
    if (value.trim() == "semua") {
      setJobs(jobsData);
    } else {
      const filteredJobs = jobsData.filter((job) =>
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
    <section>
      <div className="bg-blue-500 py-15 flex items-center">
        <div className="w-[80%] bg-slate-50 mx-auto rounded-md py-8 flex items-center justify-center">
          <form className="w-full">
            <div className="flex flex-col md:flex-row px-5 gap-2 items-center">
              <div className="w-full">
                {isFocus && (
                  <span className="w-[220px] text-xs text-slate-200 absolute top-32  transition-all bg-slate-950 rounded-lg p-2">
                    Search by title job or company name
                  </span>
                )}
                <input
                  type="text"
                  placeholder="Kata Kunci berdasarkan title job, company name"
                  className="border w-full rounded-md py-2"
                  onChange={handleChangeInputSearch}
                  value={inputSearch}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div className="w-full">
                <select
                  value={selectedCompanyName}
                  onChange={handleCompanyNameChange}
                  className="border w-full rounded-md py-2 max-h-[100px] overflow-y-auto"
                >
                  <option value="semua">Semua Perusahaan</option>
                  {uniqueName.map((res, idx) => (
                    <option key={idx} value={res}>
                      {res}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="border w-full rounded-md py-2 max-h-[200px] overflow-y-auto"
                >
                  <option value="semua">Semua Lokasi</option>
                  {uniqueCity.map((res, idx) => (
                    <option key={idx} value={res}>
                      {res}
                    </option>
                  ))}
                </select>
              </div>
              {/* <button
                className="cursor-pointer group flex w-full sm:w-[50%] md:w-[50px] justify-center gap-2 bg-blue-500 hover:bg-blue-800 p-2 rounded-xl text-slate-100"
                type="submit"
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="lg"
                  className="text-slate-100 group-hover:text-slate-100"
                />
                <span className="md:hidden">Cari</span>
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
