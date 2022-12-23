import { useAuth } from './useAuth';
import { useProyectos } from './useProyectos';

export const useAdmin = () => {
  const { proyecto } = useProyectos();
  const { auth } = useAuth();

  const admin = proyecto?.creador === auth?._id;
  return { admin };
};
