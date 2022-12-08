import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth.nombre ? (
        <Navigate to="/proyectos" />
      ) : (
        <main className="container mx-auto p-5 min-h-screen flex justify-center items-center">
          <div className="md:w-2/3 lg:w-2/5">
            <Outlet />
          </div>
          <ToastContainer />
        </main>
      )}
    </>
  );
};
