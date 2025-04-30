const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../../reportes.json");
const accidentesServices = require("../services/accidentesServices");

function guardarReporte(req, res) {
  const nuevoReporte = req.body;
  let reportes = [];

  try {
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, "utf8");
      reportes = JSON.parse(data);
    }

    reportes.push(nuevoReporte);
    fs.writeFileSync(dataPath, JSON.stringify(reportes, null, 2));
    res.json({ message: "Reporte guardado exitosamente" });
  } catch (error) {
    console.error("❌ Error al guardar el reporte:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  guardarReporte,
  getAllAccidentes: (req, res) => {
    const accidentes = accidentesServices.getAll();
    res.json(accidentes);
  },
  getAccidenteById: (req, res) => {
    const id = req.params.id;
    const accidente = accidentesServices.getById(id);
    if (accidente) {
      res.json(accidente);
    } else {
      res.status(404).send("Accidente no encontrado");
    }
  },
  createAccidente: (req, res) => {
    const newAccidente = req.body;
    if (!accidentesServices.validarReporte(newAccidente)) {
      return res.status(400).json({ error: "Datos inválidos o incompletos" });
    }
    const createdAccidente = accidentesServices.create(newAccidente);
    res.status(201).json({ message: "Reporte creado", data: createdAccidente });
  },
  updateAccidente: (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const updatedAccidente = accidentesServices.update(id, updatedData);
    if (updatedAccidente) {
      res.json(updatedAccidente);
    } else {
      res.status(404).send("Accidente no encontrado");
    }
  },
  deleteAccidente: (req, res) => {
    const id = req.params.id;
    const deleted = accidentesServices.delete(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send("Accidente no encontrado");
    }
  },
};
