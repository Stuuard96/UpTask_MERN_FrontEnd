import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const SideBar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-80 lg:w-95 px-5 py-10">
      <p className="text-xl font-bold">Hola: {auth.nombre}</p>
      <Link
        to="crear-proyecto"
        className="bg-sky-600 hover:bg-sky-700 text-white font-bold block text-center py-2 px-4 mt-5 uppercase rounded-lg"
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};
