import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProyectos } from '../hooks/useProyectos';
import { Tarea } from '../components/Tarea';
import { ModalEliminarTarea } from '../components/ModalEliminarTarea';
import { ModalFormularioTarea } from '../components/ModalFormularioTarea';
import { Colaborador } from '../components/Colaborador';
import { ModalEliminarColaborador } from '../components/ModalEliminarColaborador';
import { Alerta } from '../components/Alerta';
import { useAdmin } from '../hooks/useAdmin';

export const Proyecto = () => {
  const params = useParams();
  const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta } =
    useProyectos();
  const { admin } = useAdmin();
  const { nombre } = proyecto;

  useEffect(() => {
    obtenerProyecto(params.id);
  }, [params.id]);

  if (cargando) return <p>Cargando...</p>;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{nombre}</h1>
        {admin && (
          <div className="flex items-center gap-1 text-gray-400 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            <Link
              to={`/proyectos/editar/${params.id}`}
              className="uppercase font-bold"
            >
              Editar
            </Link>
          </div>
        )}
      </div>
      {admin && (
        <button
          type="button"
          className="bg-sky-400 hover:bg-sky-500 focus:outline-none text-white uppercase font-bold w-full md:w-auto py-2 px-4 rounded-lg mt-4 flex items-center justify-center gap-1"
          onClick={handleModalTarea}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clipRule="evenodd"
            />
          </svg>
          Nueva Tarea
        </button>
      )}
      <p className="font-bold text-xl mt-8">Tareas del Proyecto</p>
      <div className="bg-white shadow mt-8 rounded-lg">
        {proyecto.tareas?.length ? (
          proyecto.tareas.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="text-center my-5 p-7">No hay tareas en este proyecto</p>
        )}
      </div>
      {admin && (
        <>
          <div className="flex justify-between mt-8">
            <p className="font-bold text-xl">Colaboradores</p>
            <Link
              to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
              className="text-gray-400 hover:text-black uppercase font-bold"
            >
              Añadir
            </Link>
          </div>
          <div className="bg-white shadow mt-8 rounded-lg">
            {proyecto.colaboradores?.length ? (
              proyecto.colaboradores?.map((colaborador) => (
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              ))
            ) : (
              <p className="text-center my-5 p-7">
                No hay Colaboradores en este proyecto
              </p>
            )}
          </div>
        </>
      )}
      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  );
};
