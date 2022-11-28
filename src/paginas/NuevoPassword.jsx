import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import { Alerta } from '../components/Alerta';
import { toast, Slide } from 'react-toastify';

export const NuevoPassword = () => {
  const params = useParams();
  const { token } = params;
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [nuevoPassword, setNuevoPassword] = useState('');
  const [passwordModificado, setPasswordModificado] = useState(false);

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nuevoPassword.length < 6) {
      toast.error('El password debe tener al menos 6 caracteres', {
        transition: Slide,
        theme: 'colored',
        autoClose: 5000,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        `/usuarios/olvide-password/${token}`,
        {
          password: nuevoPassword,
        }
      );
      toast.success(data.msg, {
        transition: Slide,
        theme: 'colored',
        autoClose: 5000,
      });
      setNuevoPassword('');
      setPasswordModificado(true);
    } catch (error) {
      toast.error(error.response.data.msg, {
        transition: Slide,
        theme: 'colored',
        autoClose: 5000,
      });
      console.log(error.response.data.msg);
    }
  };

  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-3xl sm:text-4xl capitalize mb-6">
        Reestablece tu password y no pierdas acceso a tus{' '}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {alerta.msg && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-white shadow rounded-lg p-6 md:p-8"
        >
          <div className="mb-5">
            <label
              htmlFor="nuevo-password"
              className="block uppercase text-gray-600 text-sm font-bold"
            >
              Nuevo Password
            </label>
            <input
              type="password"
              id="nuevo-password"
              className="w-full p-2 mt-2 border border-slate-300 rounded-lg  focus:outline-none bg-gray-50 focus:bg-white focus:border-sky-500"
              placeholder="Escribe tu nuevo password"
              value={nuevoPassword}
              onChange={(e) => setNuevoPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 w-full rounded-lg p-2 text-white uppercase font-bold cursor-pointer transition-colors duration-300"
            value="Reestablecer Password"
          />
        </form>
      )}
      {passwordModificado && (
        <Link
          to="/"
          className="block text-center mt-4 text-slate-700 underline"
        >
          Volver a iniciar sesión
        </Link>
      )}
    </>
  );
};
