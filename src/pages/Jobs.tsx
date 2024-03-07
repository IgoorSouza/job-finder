import { useState, useEffect } from "react";
import { api } from "../api";
import { JobInterface } from "../interfaces/JobInterface";
import { Link } from "react-router-dom";

export const Jobs = () => {
  const [jobs, setJobs] = useState<JobInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filter = window.location.pathname.split("/")[2];

    if (filter) {
      api.get(`/jobs/${filter}`).then((res) => setJobs(res.data));
    } else {
      api.get("/jobs").then((res) => setJobs(res.data));
    }

    setLoading(false);
  }, []);

  return (
    <div className="w-[80%] xl:w-[60%] py-8 xl:py-12 mx-auto">
      {loading ? (
        <h1 className="text-2xl md:text-4xl font-medium text-center">
          Carregando...
        </h1>
      ) : (
        <>
          <h1
            className={`text-2xl md:text-4xl mb-8 md:mb-10 font-medium ${
              jobs.length === 0 ? "text-center" : "max-sm:text-center"
            }`}
          >
            {jobs.length === 0
              ? "Nenhuma vaga disponível."
              : "Vagas disponíveis:"}
          </h1>

          {jobs?.map((job) => {
            return (
              <div
                key={job.id}
                className={`flex items-center p-4 mb-6 xl:mb-10 ${
                  Date.now() - Date.parse(job.createdAt) < 1000 * 60
                    ? "bg-yellow-100"
                    : "border-[1px] border-slate-400"
                }`}
              >
                <img
                  src="/assets/company.svg"
                  alt="company image"
                  className="size-[70px] md:size-24 rounded-full border-[1px] border-black -translate-x-[65%]"
                />
                <div className="w-full md:w-[90%]">
                  <div className="md:flex md:justify-between md:items-center">
                    <div>
                      <p className="md:text-lg text-slate-500">{job.company}</p>
                      <h2 className="text-2xl md:text-4xl md:mb-1 break-words">
                        {job.title}
                      </h2>
                      <p className="md:text-lg max-md:mb-3 text-slate-500">
                        R${job.salary}
                      </p>
                    </div>

                    <div className="md:flex flex-col items-center justify-between h-full">
                      <Link
                        to={`http://localhost:5173/jobs/view/${job.id}`}
                        className="p-2 md:p-3 max-md:mr-3 md:mb-3 text-md md:text-2xl text-center border-[1px] cursor-pointer bg-red-500 text-white  hover:bg-white hover:text-red-400 hover:border-red-500"
                      >
                        Ver vaga
                      </Link>
                      {Date.now() - Date.parse(job.createdAt) < 1000 * 60 && (
                        <span className="p-2 font-medium bg-yellow-400">
                          NOVA
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};