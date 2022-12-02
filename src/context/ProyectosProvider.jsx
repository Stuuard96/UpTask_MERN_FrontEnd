import { createContext } from 'react';

export const ProyectosContext = createContext();

export const ProyectosProvider = ({ children }) => {
  return (
    <ProyectosContext.Provider value={{}}>{children}</ProyectosContext.Provider>
  );
};
