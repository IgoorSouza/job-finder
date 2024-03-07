import { useState } from "react";
import { api } from "../api";

const inputRegex = /\w/;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const NewJob = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    company: "",
    email: "",
    salary: 0,
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    titleError: false,
    descriptionError: false,
    companyError: false,
    emailError: false,
    salaryError: false,
  });

  const addJob = () => {
    const checkErrors = {
      titleError: false,
      descriptionError: false,
      companyError: false,
      emailError: false,
      salaryError: false,
    };

    checkErrors.titleError = !inputRegex.test(inputs.title);
    checkErrors.descriptionError = !inputRegex.test(inputs.description);
    checkErrors.companyError = !inputRegex.test(inputs.company);
    checkErrors.emailError = !emailRegex.test(inputs.email);
    checkErrors.salaryError = inputs.salary === 0;

    if (
      checkErrors.titleError ||
      checkErrors.descriptionError ||
      checkErrors.companyError ||
      checkErrors.emailError ||
      checkErrors.salaryError
    ) {
      setErrors(checkErrors);
    } else {
      setLoading(true);

      api
        .request({
          method: "POST",
          url: "/jobs/new",
          headers: {
            "content-type": "application/json",
          },
          data: inputs,
        })
        .then(() => window.location.assign("/jobs"));
    }
  };

  return (
    <div className="py-4 xl:py-6">
      <h1 className="mb-7 text-2xl md:text-4xl font-medium text-center break-words">
        Divulgue a vaga preenchendo o formulário
      </h1>

      <form className="flex flex-col w-[90%] max-w-screen-xl p-8 md:py-12 mx-auto shadow-sm shadow-black/60">
        <p className="mb-5 text-xl md:text-2xl font-bold text-center text-red-500">
          Preencha os dados da melhor forma possível para encontrar mais rápido
          seu dev!
        </p>

        <div className="mb-2">
          <label htmlFor="jobName" className="text-lg md:text-xl font-bold">
            Título da vaga:
          </label>
          <input
            type="text"
            id="jobName"
            maxLength={30}
            placeholder="Informe o título da vaga..."
            disabled={loading}
            className="w-full p-2 mt-1 border-[2px] border-slate-300 bg-slate-100 focus:outline-none"
            onChange={(event) => {
              setInputs({ ...inputs, title: event.target.value });
              setErrors({ ...errors, titleError: false });
            }}
          />
          {errors.titleError ? (
            <p className="text-sm text-red-500">Informe o título da vaga.</p>
          ) : (
            <p className="mt-1 text-slate-400">
              O título é muito importante, seja claro e objetivo
            </p>
          )}
        </div>

        <div className="mb-2">
          <label
            htmlFor="jobDescription"
            className="text-lg md:text-xl font-bold"
          >
            Descrição da vaga:
          </label>
          <textarea
            id="jobDescription"
            placeholder="Descreva as atividades do desenvolvedor..."
            disabled={loading}
            className="w-full h-24 p-2 mt-1 border-[2px] resize-none border-slate-300 bg-slate-100 focus:outline-none"
            onChange={(event) => {
              setInputs({ ...inputs, description: event.target.value });
              setErrors({ ...errors, descriptionError: false });
            }}
          />
          {errors.descriptionError && (
            <p className="-mt-[6px] text-sm text-red-500">
              Informe a descrição da vaga.
            </p>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="company" className="text-lg md:text-xl font-bold">
            Empresa contratante:
          </label>
          <input
            type="text"
            id="company"
            placeholder="Informe a empresa contratante..."
            disabled={loading}
            className="w-full p-2 mt-1 border-[2px] border-slate-300 bg-slate-100 focus:outline-none"
            onChange={(event) => {
              setInputs({ ...inputs, company: event.target.value });
              setErrors({ ...errors, companyError: false });
            }}
          />
          {errors.companyError && (
            <p className="text-sm text-red-500">
              Informe a empresa contratante.
            </p>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="contact" className="text-lg md:text-xl font-bold">
            Email para contato:
          </label>
          <input
            type="email"
            id="contact"
            placeholder="Informe o e-mail para contato..."
            disabled={loading}
            className="w-full p-2 mt-1 border-[2px] border-slate-300 bg-slate-100 focus:outline-none"
            onChange={(event) => {
              setInputs({ ...inputs, email: event.target.value });
              setErrors({ ...errors, emailError: false });
            }}
          />
          {errors.emailError && (
            <p className="text-sm text-red-500">
              Informe o email para contato.
            </p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="salary" className="text-lg md:text-xl font-bold">
            Salário oferecido:
          </label>
          <div className="flex items-center mt-1 border-[2px] border-slate-300 bg-slate-300">
            <span className="text-2xl px-2 text-slate-500">R$</span>
            <input
              type="number"
              id="salary"
              placeholder="Informe o salário da vaga..."
              min="0"
              disabled={loading}
              className="w-full p-2 border-l-[2px] border-slate-300 bg-slate-100 focus:outline-none"
              onChange={(event) => {
                setInputs({ ...inputs, salary: Number(event.target.value) });
                setErrors({ ...errors, salaryError: false });
              }}
            />
          </div>
          {errors.salaryError && (
            <p className="text-sm text-red-500">Informe o salário oferecido.</p>
          )}
        </div>

        <button
          type="button"
          disabled={loading}
          className={`w-1/2 p-3 mt-1 text-lg border-[1px] self-center text-white  border-red-50 ${
            loading
              ? "cursor-default bg-red-400 hover:bg-red-400 hover:text-white border-red-400"
              : "bg-red-500 hover:bg-white hover:text-red-500 hover:border-red-400"
          }`}
          onClick={addJob}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};