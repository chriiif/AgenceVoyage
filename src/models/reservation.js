const mongoose = require('mongoose');

// Définir le schéma de la réservation
const reservationSchema = new mongoose.Schema({
    dateReservation: {
        type: Date,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // Référence au modèle Client
        required: true
    },
    voyage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voyage', // Référence au modèle Voyage
        required: true
    }
}, {
    timestamps: true // Permet d'ajouter automatiquement createdAt et updatedAt
});

// Créer le modèle Reservation à partir du schéma
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
