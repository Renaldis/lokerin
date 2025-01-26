import { useContext } from "react";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { useNavigate } from "react-router-dom";

export default function DashboardListJob() {
  const navigate = useNavigate();
  const { global } = useContext(useGlobalContext);
  const { jobs } = global;

  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold p-5">List Data Perusahaan</h1>
      <form className="my-3"></form>
      <div className="relative overflow-x-auto p-10">
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
            {jobs.length > 0 ? (
              jobs.map((job) => {
                return (
                  <tr
                    key={job._id}
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
                    <td className="px-6 py-4">{job.salary_min}</td>
                    <td className="px-6 py-4">{job.salary_max}</td>
                    <td
                      className={
                        job.job_status
                          ? "text-green-500 font-semibold px-6 py-4"
                          : "text-red-500 font-semibold px-6 py-4"
                      }
                    >
                      {job.job_status ? "Open" : "Closed"}
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
                <td>Tidak ada data Tersedia</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
