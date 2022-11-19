import React from 'react';

export const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-4xl sm:text-5xl capitalize">
        Inicia sesión y administra tus{' '}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form className="mt-8 bg-white shadow rounded-lg p-7 md:p-10">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block uppercase text-gray-600 text-lg font-bold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 mt-2 border border-slate-300 rounded-lg  focus:outline-none bg-gray-50 focus:bg-white focus:border-sky-500"
            placeholder="Email de Registro"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="block uppercase text-gray-600 text-lg font-bold"
          >
            Email
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 mt-2 border border-slate-300 rounded-lg  focus:outline-none bg-gray-50 focus:bg-white focus:border-sky-500"
            placeholder="Password de Registro"
          />
        </div>
        <input
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 w-full rounded-lg p-3 text-white uppercase font-bold cursor-pointer transition-colors duration-300"
          value="Iniciar Sesión"
        />
      </form>
    </>
  );
};
