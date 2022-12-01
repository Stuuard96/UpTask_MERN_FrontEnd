import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { AppRouter } from './router/AppRouter';

export const UpTask = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
};
