import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProyectos } from '../hooks/useProyectos';
import { FormularioColaborador } from '../components/FormularioColaborador';
import { Alerta } from '../components/Alerta';

export const NuevoColaborador = () => {
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    colaborador,
    agregarColaborador,
    alerta,
  } = useProyectos();
  const paramas = useParams();

  useEffect(() => {
    obtenerProyecto(paramas.id);
  }, [paramas.id]);

  if (!proyecto?._id) {
    return <Alerta alerta={alerta} />;
  }

  return (
    <>
      <h1 className="text-3xl font-black">
        Añadir Colaborador(a) al Proyecto: {proyecto.nombre}
      </h1>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador colaborador={colaborador} />
      </div>
      {cargando ? (
        <p className="text-center">Cargando...</p>
      ) : (
        colaborador?._id && (
          <div className="mt-10 flex justify-center">
            <div className="bg-white py-8 px-5 md:w-1/2 rounded-lg shadow">
              <h2 className="text-center mb-8 text-2xl font-bold">
                Resultado:
              </h2>
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800">{colaborador.nombre}</p>
                <button
                  className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    agregarColaborador({ email: colaborador.email })
                  }
                >
                  Agregar al Proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};
