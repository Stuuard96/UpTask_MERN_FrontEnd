import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/Header';
import { SideBar } from '../components/SideBar';
import { ToastContainer } from 'react-toastify';

export const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return 'Cargando...';

  return (
    <>
      {auth.nombre ? (
        <div className="bg-gray-100">
          <Header />
          <div className="md:flex aqui">
            <SideBar />
            <main className="flex-1 p-8">
              <Outlet />
            </main>
            <ToastContainer />
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
