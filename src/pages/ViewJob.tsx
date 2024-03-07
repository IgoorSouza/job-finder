import { Link } from "react-router-dom";
import { api } from "../api";
import { useEffect, useState } from "react";
import { JobInterface } from "../interfaces/JobInterface";

export const ViewJob = () => {
  const [job, setJob] = useState<JobInterface | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const jobId = window.location.pathname.split("/")[3];
    api.get(`/jobs/view/${jobId}`).then((res) => {
      setJob(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-[90%] pt-8 mx-auto">
        <Link to="http://localhost:5173/jobs">
          <button className="w-20 h-14 text-lg md:text-2xl font-medium border-[1px] cursor-pointer text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
            Voltar
          </button>
        </Link>
      </div>

      <div className="w-[85%] max-w-screen-lg mx-auto text-center">
        {loading ? (
          <h1 className="text-2xl md:text-4xl font-medium">Carregando...</h1>
        ) : (
          <>
            <img
              src="/assets/company.svg"
              alt="company image"
              className="size-40 mb-10 mx-auto rounded-full border-[1px] border-black"
            />
            <h1 className="mb-8 text-4xl md:text-6xl font-medium text-red-500">
              {job?.title}
            </h1>
            <p className="mb-6 text-lg md:text-xl font-bold">
              Quem eles estão buscando:
            </p>
            <p className="mb-6 text-lg md:text-xl">{job?.description}</p>
            <p className="mb-6 text-lg md:text-xl">
              <span className="font-bold">O salário informado é de:</span> R$
              {job?.salary}
            </p>
            <p className="mb-6 text-lg md:text-xl">
              Para trabalhar na{" "}
              <span className="font-bold text-red-500">{job?.company}</span>{" "}
              envie um email para
              <span className="text-red-500">{job?.email}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};