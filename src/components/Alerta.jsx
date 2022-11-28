import React from 'react';

export const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error ? 'bg-red-500' : 'bg-sky-400'
      } p-3 text-white text-center font-bold rounded-lg uppercase text-sm `}
    >
      {alerta.msg}
    </div>
  );
};
