import React from 'react';

export const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error ? 'bg-red-500' : 'bg-green-500'
      } p-2 text-white text-center font-bold rounded-lg mt-5 uppercase text-sm `}
    >
      {alerta.msg}
    </div>
  );
};
