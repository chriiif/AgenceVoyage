const Reservation = require('../models/reservation');
const Client = require('../models/client');
const Voyage = require('../models/voyage');

const ReservationController = {
    // Ajouter une réservation
    addReservation: async (req, res) => {
        try {
            const { clientId, voyageId, dateReservation } = req.body;

            // Vérifiez si le client et le voyage existent
            const client = await Client.findById(clientId);
            const voyage = await Voyage.findById(voyageId);

            if (!client || !voyage) {
                return res.status(404).json({ message: 'Client ou Voyage non trouvé' });
            }

            // Créer la réservation
            const reservation = new Reservation({
                client: clientId,
                voyage: voyageId,
                dateReservation
            });

            // Sauvegarder la réservation
            await reservation.save();
            return res.status(201).json({ message: 'Réservation ajoutée avec succès', reservation });
        } catch (err) {
            return res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
        }
    },

    // Obtenir toutes les réservations
    getAllReservations: async (req, res) => {
        try {
            const reservations = await Reservation.find()
                .populate('client', 'nom prenom email') // Remplacer les données du client
                .populate('voyage', 'destination prix'); // Remplacer les données du voyage

            return res.status(200).json(reservations);
        } catch (err) {
            return res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
        }
    },

    // Obtenir une réservation par ID
    getReservationById: async (req, res) => {
        try {
            const reservation = await Reservation.findById(req.params.id)
                .populate('client', 'nom prenom email')
                .populate('voyage', 'destination prix');

            if (!reservation) {
                return res.status(404).json({ message: 'Réservation non trouvée' });
            }

            return res.status(200).json(reservation);
        } catch (err) {
            return res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
        }
    },

    // Supprimer une réservation
    deleteReservation: async (req, res) => {
        try {
            const reservation = await Reservation.findByIdAndDelete(req.params.id);

            if (!reservation) {
                return res.status(404).json({ message: 'Réservation non trouvée' });
            }

            return res.status(200).json({ message: 'Réservation supprimée avec succès' });
        } catch (err) {
            return res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
        }
    }
};

module.exports = ReservationController;
