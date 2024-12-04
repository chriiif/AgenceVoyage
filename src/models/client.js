const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    
    nom: {
        type: String,
        required: [true, "Le nom est obligatoire"],
        minlength: [2, "Le nom doit comporter au moins 2 caractères"],
    },
    prenom: {
        type: String,
        required: [true, "Le prénom est obligatoire"],
        minlength: [2, "Le prénom doit comporter au moins 2 caractères"],
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true, // Empêche les doublons d'email
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Veuillez entrer un email valide",
        ],
    },
    tel: {
        type: String,
        required: [true, "Le numéro de téléphone est obligatoire"],
        match: [/^\d{10}$/, "Le numéro de téléphone doit comporter 10 chiffres"],
    },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
