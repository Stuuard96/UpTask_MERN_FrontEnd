import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const { data } = await clienteAxios('/usuarios/perfil', config);
        setAuth(data.usuario);
        navigate('/proyectos');
      } catch (error) {
        setAuth({});
      } finally {
        setCargando(false);
      }
    };
    autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};
