import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="flex flex-col md:flex-row md:justify-between  gap-5">
        <h2 className="text-4xl text-sky-600 font-black text-center">UpTask</h2>
        <input
          type="search"
          placeholder="Buscar Proyecto"
          className="lg:w-96 block p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-600"
        />
        <div className="flex items-center justify-center md:justify-end gap-4">
          <Link to="/proyectos" className="font-bold uppercase">
            Proyectos
          </Link>
          <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 uppercase rounded-md">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};
