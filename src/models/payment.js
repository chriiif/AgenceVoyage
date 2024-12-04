const mongoose = require('mongoose');

// Définition du schéma pour le modèle Payment
const paymentSchema = new mongoose.Schema({
    montant: {
        type: Number,
        required: [true, "Le montant est obligatoire"],
        min: [0.01, "Le montant doit être supérieur à 0"]
    },
    datePaiement: {
        type: Date,
        required: [true, "La date du paiement est obligatoire"],
        default: Date.now // La date par défaut est la date actuelle
    },
    methodePaiement: {
        type: String,
        required: [true, "La méthode de paiement est obligatoire"],
        enum: ["Carte de crédit", "Carte de débit", "PayPal", "Virement bancaire"], // Enumération des méthodes valides
    },
    idReservation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation", // Relation avec la classe Reservation
        required: [true, "L'id de la réservation est obligatoire"]
    }
});

// Création du modèle Payment avec les méthodes statiques
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
