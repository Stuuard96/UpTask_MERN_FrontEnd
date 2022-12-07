import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import { Slide, toast } from 'react-toastify';
import { useEffect } from 'react';

export const ProyectosContext = createContext();

export const ProyectosProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const obtenerProyectos = async () => {
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios('/proyectos', config);
        setProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProyectos();
  }, []);

  const submitProyecto = async (proyecto) => {
    if (!token) return;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.post('/proyectos', proyecto, config);
      setProyectos([...proyectos, data]);
      toast.success('Proyecto creado correctamente', {
        transition: Slide,
        theme: 'colored',
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate('/proyectos');
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerProyecto = async (id) => {
    setCargando(true);
    if (!token) return;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios(`/proyectos/${id}`, config);
      setProyecto(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        setProyectos,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};
