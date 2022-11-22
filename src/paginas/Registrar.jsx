import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alerta } from '../components/Alerta';

const initialForm = {
  nombre: '',
  email: '',
  password: '',
  repetirPassword: '',
};

export const Registrar = () => {
  const [form, setForm] = useState(initialForm);
  const [alerta, setAlerta] = useState({});
  const { nombre, email, password, repetirPassword } = form;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((value) => value.trim() === '')) {
      setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios',
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        error: true,
        msg: 'Las contraseñas no coinciden',
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        error: true,
        msg: 'La contraseña debe tener al menos 6 caracteres',
      });
      return;
    }

    setAlerta({});
  };

  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-3xl sm:text-4xl capitalize">
        Crea tu cuenta y administra tus{' '}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {alerta.msg && <Alerta alerta={alerta} />}
      <form
        onSubmit={handleSubmit}
        className="mt-5 bg-white shadow rounded-lg p-6 md:p-8"
      >
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="block uppercase text-gray-600 text-sm font-bold"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className="w-full p-2 mt-2 border border-slate-300 rounded-lg  focus:outline-none bg-gray-50 focus:bg-white focus:border-sky-500"
            placeholder="Nombre de Registro"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
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
            onChange={handleChange}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="block uppercase text-gray-600 text-sm font-bold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 mt-2 border border-slate-300 rounded-lg  focus:outline-none bg-gray-50 focus:bg-white focus:border-sky-500"
            placeholder="Password de Registro"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="confirmar-password"
            className="block uppercase text-gray-600 text-sm font-bold"
          >
            Confirmar Password
          </label>
          <input
            type="password"
            id="confirmar-password"
            className="w-full p-2 mt-2 border border-slate-300 rounded-lg  focus:outline-none bg-gray-50 focus:bg-white focus:border-sky-500"
            placeholder="Confirmar Password de Registro"
            name="repetirPassword"
            value={repetirPassword}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 w-full rounded-lg p-2 text-white uppercase font-bold cursor-pointer transition-colors duration-300"
          value="Crear Cuenta"
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
          to="olvide-password"
          className="uppercase text-xs block text-center mt-3 text-slate-700"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </nav>
    </>
  );
};
