import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import { toast, Slide } from 'react-toastify';

export const OlvidePassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || email.trim().length < 6) {
      toast.error('El email es obligatorio', {
        transition: Slide,
        theme: 'colored',
        autoClose: 5000,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/olvide-password', {
        email,
      });
      toast.success(data.msg, {
        transition: Slide,
        theme: 'colored',
        autoClose: 5000,
      });
      setEmail('');
    } catch (error) {
      toast.error(error.response.data.msg, {
        transition: Slide,
        theme: 'colored',
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-3xl sm:text-4xl capitalize">
        Crea tu cuenta y administra tus{' '}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-8 bg-white shadow rounded-lg p-6 md:p-8"
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block uppercase text-gray-600 text-sm font-bold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 mt-2 border border-slate-300 rounded-lg  focus:outline-none bg-gray-50 focus:bg-white focus:border-sky-500"
            placeholder="Email de Registro"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 w-full rounded-lg p-2 text-white uppercase font-bold cursor-pointer transition-colors duration-300"
          value="Recuperar Password"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="uppercase text-xs block text-center mt-3 text-slate-700"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          to="/registrar"
          className="uppercase text-xs block text-center mt-3 text-slate-700"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
};
