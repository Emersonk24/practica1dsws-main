const accidentes = [];

function validarReporte(reporte) {
  return (
    reporte.nombre &&
    reporte.tipoDocumento &&
    reporte.numeroDocumento &&
    reporte.fecha
  );
}

module.exports = {
  validarReporte,
  getAll: () => accidentes,
  getById: (id) => accidentes.find((a) => a.id === parseInt(id)),
  create: (nuevo) => {
    nuevo.id = accidentes.length + 1;
    accidentes.push(nuevo);
    return nuevo;
  },
  update: (id, data) => {
    const index = accidentes.findIndex((a) => a.id === parseInt(id));
    if (index !== -1) {
      accidentes[index] = { ...accidentes[index], ...data };
      return accidentes[index];
    }
    return null;
  },
  delete: (id) => {
    const index = accidentes.findIndex((a) => a.id === parseInt(id));
    if (index !== -1) {
      accidentes.splice(index, 1);
      return true;
    }
    return false;
  },
};
