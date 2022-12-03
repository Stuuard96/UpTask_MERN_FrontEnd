import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import { Slide, toast } from 'react-toastify';

export const ProyectosContext = createContext();

export const ProyectosProvider = ({ children }) => {
  const navigate = useNavigate();
  const submitProyecto = async (proyecto) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.post('/proyectos', proyecto, config);
      toast.success('Proyecto creado correctamente', {
        transition: Slide,
        theme: 'colored',
        autoClose: 4000,
      });

      setTimeout(() => {
        navigate('/proyectos');
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProyectosContext.Provider value={{ submitProyecto }}>
      {children}
    </ProyectosContext.Provider>
  );
};
