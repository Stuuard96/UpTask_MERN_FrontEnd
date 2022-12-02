import { Route, Routes } from 'react-router-dom';
import { AuthLayout, RutaProtegida } from '../layouts';
import {
  ConfirmarCuenta,
  Login,
  NuevoPassword,
  OlvidePassword,
  Registrar,
  Proyectos,
  NuevoProyecto,
} from '../paginas';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="registrar" element={<Registrar />} />
        <Route path="olvide-password" element={<OlvidePassword />} />
        <Route path="olvide-password/:token" element={<NuevoPassword />} />
        <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
      </Route>

      <Route path="/proyectos" element={<RutaProtegida />}>
        <Route index element={<Proyectos />} />
        <Route path="crear-proyecto" element={<NuevoProyecto />} />
      </Route>
    </Routes>
  );
};
