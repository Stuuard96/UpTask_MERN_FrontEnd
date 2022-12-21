import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import { Slide, toast } from 'react-toastify';

export const ProyectosContext = createContext();

export const ProyectosProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState({});
  const [tarea, setTarea] = useState({});
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  const [colaborador, setColaborador] = useState({});

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
  }, [token]);

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
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargando(false);
    }
  };

  const submitProyecto = async (proyecto) => {
    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }
  };

  const nuevoProyecto = async (proyecto) => {
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

  const editarProyecto = async (proyecto) => {
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto.id}`,
        proyecto,
        config
      );

      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === data._id ? data : proyectoState
      );
      setProyectos(proyectosActualizados);
      toast.success('Proyecto editado correctamente', {
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

  const eliminarProyecto = async (id) => {
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);
      const proyectosActualizados = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );
      setProyectos(proyectosActualizados);
      toast.success(data.msg, {
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

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(!modalFormularioTarea);
  };

  const handleModalEliminarTarea = (tarea) => {
    if (tarea._id) {
      setTarea(tarea);
    } else {
      setTarea({});
    }
    setModalEliminarTarea(!modalEliminarTarea);
  };

  const submitTarea = async (tarea) => {
    if (tarea.id) {
      await editarTarea(tarea);
    } else {
      await nuevaTarea(tarea);
    }
  };

  const nuevaTarea = async (tarea) => {
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.post('/tareas', tarea, config);
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = [...proyecto.tareas, data];
      setProyecto(proyectoActualizado);
      toast.success('Tarea creada correctamente', {
        transition: Slide,
        theme: 'colored',
        autoClose: 3000,
      });
      handleModalTarea();
    } catch (error) {
      console.log(error);
    }
  };

  const editarTarea = async (tarea) => {
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(
        (tareaState) => (tareaState._id === data._id ? data : tareaState)
      );
      setProyecto(proyectoActualizado);
      toast.success('Tarea editada correctamente', {
        transition: Slide,
        theme: 'colored',
        autoClose: 3000,
      });
      handleModalTarea();
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarTarea = async () => {
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.delete(
        `/tareas/${tarea._id}`,
        config
      );
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
        (tareaState) => tareaState._id !== tarea._id
      );
      setProyecto(proyectoActualizado);
      toast.success(data.msg, {
        transition: Slide,
        theme: 'colored',
        autoClose: 3000,
      });
      setModalEliminarTarea(false);
      setTarea({});
    } catch (error) {
      console.log(error);
    }
  };

  const submitColaborador = async (email) => {
    setCargando(true);
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores`,
        { email },
        config
      );
      setColaborador(data);
      toast.success(data.msg, {
        transition: Slide,
        theme: 'colored',
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        transition: Slide,
        theme: 'colored',
        autoClose: 3000,
      });
    } finally {
      setCargando(false);
    }
  };

  const agregarColaborador = async (email) => {
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores/${proyecto._id}`,
        email,
        config
      );

      toast.success(data.msg, {
        transition: Slide,
        theme: 'colored',
        autoClose: 3000,
      });

      setColaborador({});
    } catch (error) {
      toast.error(error.response.data.msg, {
        transition: Slide,
        theme: 'colored',
        autoClose: 3000,
      });
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
        alerta,
        setAlerta,
        eliminarProyecto,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        handleModalEliminarTarea,
        modalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};
