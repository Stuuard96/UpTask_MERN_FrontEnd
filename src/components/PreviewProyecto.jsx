import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PreviewProyecto = ({ proyecto }) => {
  const { nombre, cliente, _id, creador } = proyecto;
  const { auth } = useAuth();

  return (
    <div className="border-b p-5 flex flex-col md:flex-row gap-3">
      <p>
        {nombre}
        <span className="block text-gray-500 uppercase text-sm">{cliente}</span>
      </p>
      {auth._id !== creador && (
        <p className=" p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">
          Colaborador
        </p>
      )}
      <Link
        to={`${_id}`}
        className="flex-1 text-gray-600 font-semibold hover:text-gray-900 uppercase md:text-end"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};
