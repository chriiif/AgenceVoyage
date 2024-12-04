const express = require("express");
const router = express.Router();
const voyageController = require("../controllers/voyageController");

// Récupérer tous les voyages
router.get("/", voyageController.getAllVoyages);

// Récupérer un voyage par ID
router.get("/:id", voyageController.getVoyageById);

// Ajouter un nouveau voyage
router.post("/add", voyageController.addVoyage);

// Mettre à jour un voyage par ID
router.put("/:id", voyageController.updateVoyage);

// Supprimer un voyage par ID
router.delete("/effacer/:id", voyageController.deleteVoyage);

module.exports = router;
