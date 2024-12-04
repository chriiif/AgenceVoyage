const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentControlleur');

// Ajouter un paiement
router.post("/add", paymentController.addPayment);

// Récupérer tous les paiements
router.get("/", paymentController.getAllPayments);

// Récupérer un paiement par ID
router.get("/:id", paymentController.getPaymentById);



module.exports = router;
