import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { useProyectos } from '../hooks/useProyectos';
import { Slide, toast } from 'react-toastify';

const PRIORIDAD = ['Baja', 'Media', 'Alta'];
const initialForm = {
  nombre: '',
  descripcion: '',
  prioridad: '',
  fechaEntrega: '',
};

export const ModalFormularioTarea = () => {
  const [form, setForm] = useState(initialForm);
  const [id, setId] = useState(null);
  const { modalFormularioTarea, handleModalTarea, submitTarea, tarea } =
    useProyectos();
  const { nombre, descripcion, prioridad, fechaEntrega } = form;
  const params = useParams();

  useEffect(() => {
    if (tarea?._id) {
      setForm({
        nombre: tarea.nombre,
        descripcion: tarea.descripcion,
        fechaEntrega: tarea.fechaEntrega?.split('T')[0],
        prioridad: tarea.prioridad,
      });
      setId(tarea._id);
      return;
    }
    setForm(initialForm);
    setId(null);
  }, [tarea]);

  const handleInputChange = ({ target }) => {
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
    await submitTarea({ ...form, proyecto: params.id, id });
    setForm(initialForm);
    setId(null);
  };

  return (
    <Transition.Root show={modalFormularioTarea} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalTarea}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={handleModalTarea}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    {id ? 'Editar Tarea' : 'Nueva Tarea'}
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="my-6">
                    <div className="mb-4">
                      <label
                        htmlFor="nombre"
                        className="uppercase text-gray-700 text-sm font-bold mb-2"
                      >
                        Nombre Tarea
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre de la Tarea"
                        className="w-full border mt-2 p-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400"
                        name="nombre"
                        value={nombre}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="descripcion"
                        className="uppercase text-gray-700 text-sm font-bold mb-2"
                      >
                        Descripción Tarea
                      </label>
                      <textarea
                        id="descripcion"
                        placeholder="Descripción de la Tarea"
                        className="w-full border mt-2 p-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400"
                        name="descripcion"
                        value={descripcion}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="fecha-entrega"
                        className="uppercase text-gray-700 text-sm font-bold mb-2"
                      >
                        Fecha Entrega
                      </label>
                      <input
                        type="date"
                        id="fecha-entrega"
                        className="w-full border mt-2 p-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400"
                        name="fechaEntrega"
                        value={fechaEntrega}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="prioridad"
                        className="uppercase text-gray-700 text-sm font-bold mb-2"
                      >
                        Prioridad
                      </label>
                      <select
                        id="prioridad"
                        className="w-full border mt-2 p-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 text-center"
                        name="prioridad"
                        value={prioridad}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          -- Seleccione --
                        </option>
                        {PRIORIDAD.map((prioridad) => (
                          <option key={prioridad}>{prioridad}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 text-white font-bold w-full py-2 px-4 cursor-pointer rounded"
                      value={id ? 'Guardar Cambios' : 'Crear Tarea'}
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
