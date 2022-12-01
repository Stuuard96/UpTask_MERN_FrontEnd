import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  console.log(auth);

  if (cargando) return 'Cargando...';
  return <>{auth.nombre ? <Outlet /> : <Navigate to="/" />}</>;
};
