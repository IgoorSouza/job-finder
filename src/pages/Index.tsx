import { useRef } from "react";
import { Highlights } from "../components/Highlights";

const inputRegex = /\w/;

export const Index = () => {
  const searchInput = useRef<HTMLInputElement>(null);

  const searchJobs = () => {
    if (searchInput.current && inputRegex.test(searchInput.current.value)) {
      window.location.assign(
        `http://localhost:5173/jobs/${searchInput.current.value}`
      );
    }
  };

  return (
    <>
      <div className="h-[600px] md:h-[850px] bg-[url('/assets/banner.jpg')] bg-cover bg-top">
        <div className="flex flex-col items-center justify-evenly h-full">
          <div className="w-[80%] text-center text-white">
            <h1 className="mb-10 md:mb-14 text-4xl md:text-6xl">
              Encontre o emprego dos seus sonhos
            </h1>
            <p className="md:text-2xl">
              Somos o site com mais vagas de tecnologia do mercado, direcionadas
              a home office
            </p>
          </div>

          <div className="flex w-[80%] max-w-[900px]">
            <input
              placeholder="Digite a vaga que está buscando..."
              ref={searchInput}
              className="w-full p-3 text-lg focus:outline-none"
            />

            <button
              className="flex items-center p-3 text-lg cursor-pointer border-[1px] border-red-500 bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border-red-400"
              onClick={searchJobs}
            >
              Procurar
            </button>
          </div>
        </div>
        <Highlights />
      </div>
    </>
  );
};