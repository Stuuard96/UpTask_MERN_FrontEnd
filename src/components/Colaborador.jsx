import { useProyectos } from '../hooks/useProyectos';

export const Colaborador = ({ colaborador }) => {
  const { handleModalEliminarColaborador } = useProyectos();
  const { nombre, email } = colaborador;
  return (
    <div className="border-b p-5 flex items-center justify-between">
      <div>
        <p>{nombre}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>
      <div>
        <button
          className="bg-red-500 hover:bg-red-700 text-white uppercase text-sm font-bold py-2 px-4 rounded"
          onClick={() => handleModalEliminarColaborador(colaborador)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
