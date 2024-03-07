import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { JobInterface } from "../interfaces/JobInterface";

export const Highlights = () => {
  const [highlights, setHighlights] = useState<JobInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/").then((res) => {
      setHighlights(res.data);
    });

    setLoading(false);
  }, []);

  return (
    <div className="w-[80%] xl:w-[60%] py-8 xl:py-12 mx-auto">
      <h1
        className={`text-2xl md:text-4xl mb-8 md:mb-10 font-medium  ${
          highlights.length === 0 ? "text-center" : "max-sm:text-center"
        }`}
      >
        {highlights.length === 0
          ? "Nenhuma vaga em destaque no momento."
          : "Veja as nossas vagas em destaque"}
      </h1>

      {loading ? (
        <h1 className="text-2xl md:text-4xl py-20 font-medium text-center ">
          Carregando...
        </h1>
      ) : (
        highlights?.map((highlight) => {
          return (
            <div
              key={highlight.id}
              className={`flex items-center p-4 mb-6 xl:mb-10 ${
                Date.now() - Date.parse(highlight.createdAt) < 1000 * 60
                  ? "bg-yellow-100"
                  : "border-slate-400 border-[1px]"
              }`}
            >
              <img
                src="/assets/company.svg"
                alt="company image"
                className="size-[70px] md:size-24 rounded-full border-[1px] -translate-x-[65%] border-black"
              />
              <div className="w-full md:w-[90%]">
                <div className="md:flex justify-between items-center">
                  <div>
                    <p className="md:text-lg text-slate-500">
                      {highlight.company}
                    </p>
                    <h2 className="text-2xl md:text-4xl md:mb-1 break-words">
                      {highlight.title}
                    </h2>
                    <p className="md:text-lg max-md:mb-3 text-slate-500">
                      R${highlight.salary}
                    </p>
                  </div>

                  <div className="md:flex flex-col items-center justify-between h-full">
                    <Link
                      to={`jobs/view/${highlight.id}`}
                      className="p-2 md:p-3 md:mb-3 max-md:mr-3 text-md md:text-2xl text-center border-[1px] cursor-pointer bg-red-500 text-white hover:bg-white hover:text-red-400 hover:border-red-500"
                    >
                      Ver vaga
                    </Link>
                    {Date.now() - Date.parse(highlight.createdAt) <
                      1000 * 60 && (
                      <span className="p-2 font-medium bg-yellow-400">
                        NOVA
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};