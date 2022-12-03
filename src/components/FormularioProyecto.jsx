import { useState } from 'react';
import { Slide, toast } from 'react-toastify';
import { useProyectos } from '../hooks/useProyectos';

const initialForm = {
  nombre: '',
  descripcion: '',
  fechaEntrega: '',
  cliente: '',
};

export const FormularioProyecto = () => {
  const [form, setForm] = useState(initialForm);
  const { nombre, descripcion, fechaEntrega, cliente } = form;
  const { submitProyecto } = useProyectos();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(form).some((value) => value.trim() === '')) {
      toast.error('Todos los campos son obligatorios', {
        transition: Slide,
        theme: 'colored',
        autoClose: 5000,
      });
      return;
    }

    await submitProyecto(form);
    setForm(initialForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
    >
      <div className="mb-5">
        <label
          className="text-gray-700 text-sm font-bold mb-2 uppercase"
          htmlFor="nombre"
        >
          Nombre Proyecto
        </label>
        <input
          type="text"
          id="nombre"
          className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Nombre del Proyecto"
          name="nombre"
          value={nombre}
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 text-sm font-bold mb-2 uppercase"
          htmlFor="descripcion"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Descripción del Proyecto"
          name="descripcion"
          value={descripcion}
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 text-sm font-bold mb-2 uppercase"
          htmlFor="fecha-entrega"
        >
          Fecha Entrega
        </label>
        <input
          type="date"
          id="fecha-entrega"
          className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="fechaEntrega"
          value={fechaEntrega}
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 text-sm font-bold mb-2 uppercase"
          htmlFor="cliente"
        >
          Nombre Cliente
        </label>
        <input
          type="text"
          id="cliente"
          className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Nombre del Cliente"
          name="cliente"
          value={cliente}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-sky-600 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-sky-700 cursor-pointer rounded-lg"
        value="Crear Proyecto"
      />
    </form>
  );
};
