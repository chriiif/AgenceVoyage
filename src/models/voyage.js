const mongoose = require('mongoose');

// Définition du schéma pour le modèle Voyage
const voyageSchema = new mongoose.Schema({
   
    destination: {
        type: String,
        required: [true, "La destination est obligatoire"],
        minlength: [3, "La destination doit comporter au moins 3 caractères"]
    },
    datedepart: {
        type: Date,
        required: [true, "La date de départ est obligatoire"],
        validate: {
            validator: function(value) {
                return value > new Date(); // La date de départ doit être dans le futur
            },
            message: "La date de départ doit être dans le futur"
        }
    },
    dateretour: {
        type: Date,
        required: [true, "La date de retour est obligatoire"],
        validate: {
            validator: function(value) {
                return value > this.datedepart; // La date de retour doit être après la date de départ
            },
            message: "La date de retour doit être après la date de départ"
        }
    },
    prix: {
        type: Number,
        required: [true, "Le prix est obligatoire"],
        min: [1, "Le prix doit être supérieur à 0"]
    }
});

// Création du modèle Voyage avec les méthodes statiques
const Voyage = mongoose.model('Voyage', voyageSchema);

module.exports = Voyage;
