import { formatearFecha } from '../helpers/formatearFecha';
import { useProyectos } from '../hooks/useProyectos';

export const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();
  const { nombre, descripcion, fechaEntrega, prioridad, estado } = tarea;

  return (
    <div className="border-b p-5 flex flex-col gap-3 md:flex-row md:gap-0 justify-between items-center">
      <div className="flex flex-col gap-1">
        <p className="font-bold text-gray-700 text-xl">{nombre}</p>
        <p className="text-gray-500 uppercase text-sm">{descripcion}</p>
        <p className="text-lg">{formatearFecha(fechaEntrega)}</p>
        <p className="text-gray-600">Prioridad: {prioridad}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleModalEditarTarea(tarea)}
        >
          Editar
        </button>
        {estado ? (
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded">
            Completa
          </button>
        ) : (
          <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Incompleta
          </button>
        )}
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleModalEliminarTarea(tarea)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
