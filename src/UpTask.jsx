import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, ProyectosProvider } from './context';
import { AppRouter } from './router/AppRouter';

export const UpTask = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <AppRouter />
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
