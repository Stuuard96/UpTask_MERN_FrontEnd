import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProyectos } from '../hooks/useProyectos';
import Busqueda from './Busqueda';

export const Header = () => {
  const { setAuth } = useAuth();
  const { setProyectos, handleBuscador, buscador } = useProyectos();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth({});
    setProyectos([]);
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="flex flex-col md:flex-row md:justify-between  gap-5">
        <h2 className="text-4xl text-sky-600 font-black text-center">UpTask</h2>

        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-4">
          <button
            type="button"
            className="text-gray-600 hover:text-gray-900 font-bold uppercase"
            onClick={handleBuscador}
          >
            Buscar Proyecto
          </button>
          <Link
            to="/proyectos"
            className="text-gray-600 hover:text-gray-900 font-bold uppercase"
          >
            Proyectos
          </Link>
          <button
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 uppercase rounded-md"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
          <Busqueda />
        </div>
      </div>
    </header>
  );
};
