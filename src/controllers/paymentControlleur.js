const Payment = require('../models/payment'); // Importation du modèle Payment

// Ajouter un paiement
const addPayment = async (req, res) => {
    try {
        const { reservationId, montant, datePaiement, modePaiement, status } = req.body;

        // Vérification des données reçues
        if (!reservationId || !montant || !datePaiement || !modePaiement || !status) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        // Création d'un nouvel objet Payment
        const newPayment = new Payment({
            reservationId,
            montant,
            datePaiement,
            modePaiement,
            status
        });

        // Sauvegarde du paiement dans la base de données
        await newPayment.save();

        res.status(201).json({
            message: "Paiement ajouté avec succès",
            payment: newPayment
        });
    } catch (error) {
        console.error("Erreur lors de l'ajout du paiement :", error);
        res.status(500).json({
            message: "Erreur lors de l'ajout du paiement",
            error: error.message
        });
    }
};


// Récupérer tous les paiements
const getAllPayments = async (req, res) => {
    try {
        // Récupération de tous les paiements et remplissage des informations de la réservation associée
        const payments = await Payment.find().populate('idReservation');
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des paiements", error: error.message });
    }
};

// Récupérer un paiement par ID
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('idReservation');
        
        if (!payment) {
            return res.status(404).json({ message: "Paiement non trouvé" });
        }
        
        res.status(200).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération du paiement", error: error.message });
    }
};

// Mettre à jour un paiement par ID


module.exports = {
    addPayment,
    getAllPayments,
    getPaymentById
};
