import { Link } from 'react-router-dom';

export const PreviewProyecto = ({ proyecto }) => {
  const { nombre, cliente, _id } = proyecto;

  return (
    <div className="border-b p-5 flex items-center">
      <p className="flex-1">
        {nombre}
        <span className="block text-gray-500 uppercase text-sm">{cliente}</span>
      </p>
      <Link
        to={`${_id}`}
        className="text-gray-600 font-semibold hover:text-gray-900 uppercase"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};
