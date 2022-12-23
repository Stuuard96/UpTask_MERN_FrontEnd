import { useEffect, useRef, useState } from 'react';
import { Slide, toast } from 'react-toastify';
import { useProyectos } from '../hooks/useProyectos';

export const FormularioColaborador = ({ colaborador }) => {
  const { submitColaborador } = useProyectos();
  const [email, setEmail] = useState('');
  const emailInput = useRef(null);

  useEffect(() => {
    if (colaborador?.email) {
      setEmail('');
    }
  }, [colaborador]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    emailInput.current.focus();
    if (email.trim() === '') {
      toast.error('El email es obligatorio', {
        transition: Slide,
        theme: 'colored',
        autoClose: 4000,
      });
      return;
    }
    await submitColaborador(email);
  };

  return (
    <form
      className="bg-white py-8 px-5 md:w-10/12 lg:w-1/2 rounded-lg shadow w-full"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          htmlFor="email"
          className="uppercase text-gray-700 text-sm font-bold mb-2"
        >
          Email Colaborador
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email del usuario a buscar"
          className="w-full border mt-2 p-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400"
          name="email"
          autoFocus
          ref={emailInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 text-white font-bold w-full py-2 px-4 cursor-pointer rounded"
        value="Buscar Colaborador"
      />
    </form>
  );
};
