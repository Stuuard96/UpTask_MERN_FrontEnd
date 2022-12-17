export const formatearFecha = (fecha) => {
  // const fechaFormateada = new Date(fecha);
  const fechaFormateada = new Date(fecha.split('T')[0].split('-'));

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return fechaFormateada.toLocaleDateString('es-ES', options);
};
