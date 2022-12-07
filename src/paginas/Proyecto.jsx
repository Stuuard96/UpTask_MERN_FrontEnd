import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProyectos } from '../hooks/useProyectos';

export const Proyecto = () => {
  const params = useParams();
  const { obtenerProyecto, proyecto, cargando } = useProyectos();
  const { nombre } = proyecto;

  useEffect(() => {
    obtenerProyecto(params.id);
  }, [params.id]);

  return (
    <>
      {cargando ? (
        <h1>Cargando...</h1>
      ) : (
        <div>
          <h1 className="font-black text-4xl">{nombre}</h1>
        </div>
      )}
    </>
  );
};
