const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const token = require("../middleware/verifyToken");

// Récupérer tous les clients
router.get("/" ,clientController.getAllClients);

// Récupérer un client par ID client
router.get("/:id", clientController.getClientById);

// Ajouter un nouveau client
router.post("/add", clientController.addClient);


// Mettre à jour un client par ID client
router.put("/:id", clientController.updateClient);

// Supprimer un client par ID client
router.delete("/affacer/:id", clientController.deleteClient);

module.exports = router;
