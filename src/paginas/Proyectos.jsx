import { useProyectos } from '../hooks/useProyectos';
import { Alerta } from '../components/Alerta';
import { PreviewProyecto } from '../components/PreviewProyecto';

export const Proyectos = () => {
  const { proyectos, alerta } = useProyectos();

  return (
    <>
      <h1 className="text-3xl font-black">Proyectos</h1>
      {alerta.msg && <Alerta alerta={alerta} />}
      <div className="bg-white shadow mt-8 rounded-lg">
        {proyectos.length > 0 ? (
          proyectos.map((proyecto) => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            No hay proyectos
          </p>
        )}
      </div>
    </>
  );
};
