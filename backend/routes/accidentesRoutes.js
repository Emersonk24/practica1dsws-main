const express = require("express");
const router = express.Router();
const accidentesController = require("../controllers/accidentesController");

router.get("/accidentes", accidentesController.getAllAccidentes);
router.get("/accidentes/:id", accidentesController.getAccidenteById);
router.post("/accidentes", accidentesController.createAccidente);
router.put("/accidentes/:id", accidentesController.updateAccidente);
router.delete("/accidentes/:id", accidentesController.deleteAccidente);

module.exports = router;
