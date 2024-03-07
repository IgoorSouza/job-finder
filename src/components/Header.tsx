import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex max-md:flex-col justify-between items-center p-6 border-[2px] bg-slate-100">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl md:text-4xl">
          <Link to="http://localhost:5173/">Job Finder</Link>
        </h1>
        <button onClick={() => setShowMenu((state) => !state)}>
          <img src="/assets/menu.svg" className="size-6 mx-auto md:hidden" />
        </button>
      </div>

      <div
        className={`flex max-md:flex-col md:justify-end w-full text-center max-md:mt-2 ${
          showMenu ? "block" : "max-md:hidden"
        }`}
      >
        <Link
          to="http://localhost:5173/jobs"
          className="p-2 md:p-4 md:mr-5 text-lg md:text-xl font-medium cursor-pointer text-slate-500"
        >
          Ver Vagas
        </Link>

        <Link
          to="http://localhost:5173/jobs/new"
          className="p-2 md:p-4 text-lg md:text-xl font-medium cursor-pointer bg-red-500 text-white border-[1px] border-red-500 hover:bg-white hover:text-red-500"
        >
          Abrir Vaga
        </Link>
      </div>
    </div>
  );
};