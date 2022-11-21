export const NuevoPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-3xl sm:text-4xl capitalize">
        Reestablece tu password y no pierdas acceso a tus{' '}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form className="mt-8 bg-white shadow rounded-lg p-6 md:p-8">
        <div className="my-5">
          <label
            htmlFor="nuevo-password"
            className="block uppercase text-gray-600 text-sm font-bold"
          >
            Nuevo Password
          </label>
          <input
            type="password"
            id="nuevo-password"
            className="w-full p-2 mt-2 border border-slate-300 rounded-lg  focus:outline-none bg-gray-50 focus:bg-white focus:border-sky-500"
            placeholder="Escribe tu nuevo password"
          />
        </div>

        <input
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 w-full rounded-lg p-2 text-white uppercase font-bold cursor-pointer transition-colors duration-300"
          value="Reestablecer Password"
        />
      </form>
    </>
  );
};
