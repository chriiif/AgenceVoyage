const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController');

// Routes pour la gestion des réservations
router.get('/', ReservationController.getAllReservations); // Obtenir toutes les réservations
router.get('/:id', ReservationController.getReservationById); // Obtenir une réservation par ID
router.post('/add', ReservationController.addReservation); // Ajouter une réservation
router.delete('/effacer/:id', ReservationController.deleteReservation); // Supprimer une réservation

module.exports = router;
