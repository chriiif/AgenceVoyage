const Client = require("../models/client");

const clientController = {
    // Récupérer tous les clients
    getAllClients: async (req, res) => {
        try {
            const clients = await Client.find();
            res.status(200).json(clients);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des clients", error });
        }
    },

    // Récupérer un client par ID client
    getClientById: async (req, res) => {
        try {
            const client = await Client.findOne({ idClient: req.params.id });
            if (!client) {
                return res.status(404).json({ message: "Client non trouvé" });
            }
            res.status(200).json(client);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération du client", error });
        }
    },

    // Ajouter un nouveau client
    addClient: async (req, res) => {
        try {
            const newClient = new Client(req.body);
            await newClient.save();
            res.status(201).json(newClient);
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({ message: "L'idClient ou l'email existe déjà", error });
            } else {
                res.status(500).json({ message: "Erreur lors de l'ajout du client", error });
            }
        }
    },

    // Mettre à jour un client par ID client
    updateClient: async (req, res) => {
        try {
            const updatedClient = await Client.findOneAndUpdate(
                { idClient: req.params.id },
                req.body,
                { new: true }
            );
            if (!updatedClient) {
                return res.status(404).json({ message: "Client non trouvé" });
            }
            res.status(200).json(updatedClient);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du client", error });
        }
    },

    // Supprimer un client par ID client
    deleteClient: async (req, res) => {
        try {
            const deletedClient = await Client.findOneAndDelete({ idClient: req.params.id });
            if (!deletedClient) {
                return res.status(404).json({ message: "Client non trouvé" });
            }
            res.status(200).json({ message: "Client supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du client", error });
        }
    },
};

module.exports = clientController;
