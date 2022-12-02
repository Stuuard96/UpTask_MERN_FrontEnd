import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { SideBar } from '../components/SideBar';
import { useAuth } from '../hooks/useAuth';

export const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return 'Cargando...';
  return (
    <>
      {auth.nombre ? (
        <div className="bg-gray-100">
          <Header />
          <div className="md:flex ">
            <SideBar />
            <main className="flex-1 p-8">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
