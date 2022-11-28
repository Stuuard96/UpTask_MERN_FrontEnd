import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import { Alerta } from '../components/Alerta';

export const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios(`/usuarios/confirmar/${id}`);
        setAlerta({
          msg: data.msg,
          error: false,
        });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    // confirmarCuenta();
    return () => confirmarCuenta();
  }, []);

  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-3xl sm:text-4xl capitalize">
        Confirma tu cuenta y administra tus{' '}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <div className="mt-10 shadow-lg rounded-xl p-4 md:p-8 bg-white">
        {alerta.msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            to="/"
            className="uppercase text-xs underline block text-center mt-3 text-gray-600 font-semibold"
          >
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};
