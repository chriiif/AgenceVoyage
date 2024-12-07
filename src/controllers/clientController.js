const Client = require("../models/client");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
            console.log("Données reçues :", req.body);

            const { nom, prenom, email, tel, password } = req.body;

            // Vérifiez que toutes les données nécessaires sont présentes
            if (!nom || !prenom || !email || !tel || !password) {
                return res.status(400).json({ message: "Tous les champs sont requis." });
            }

            // Hash du mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("Mot de passe hashé :", hashedPassword);

            // Création du client
            const newClient = new Client({
                nom,
                prenom,
                email,
                tel,
                password: hashedPassword,
            });

            // Sauvegarde dans MongoDB
            await newClient.save();
            console.log("Client ajouté avec succès :", newClient);

            res.status(201).json(newClient);
        } catch (error) {
            console.error("Erreur lors de l'ajout du client :", error);

            if (error.code === 11000) {
                res.status(400).json({ message: "L'email existe déjà.", error });
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

    loginClient: async (req, res) => {
        try {
            const { email, password } = req.body;

            console.log("Données reçues pour la connexion :", { email, password });

            // Vérifiez si l'email existe dans la base de données
            const client = await Client.findOne({ email });
            if (!client) {
                console.log("Aucun client trouvé avec cet email :", email);
                return res.status(404).json({ message: "Email ou mot de passe incorrect" });
            }

            console.log("Client trouvé :", client);

            // Vérifiez le mot de passe
            const isPasswordValid = await bcrypt.compare(password, client.password);
            if (!isPasswordValid) {
                console.log("Mot de passe incorrect pour l'email :", email);
                return res.status(401).json({ message: "Email ou mot de passe incorrect" });
            }

            console.log("Mot de passe validé pour le client :", client.email);

            // Générer un token JWT
            const token = jwt.sign(
                { id: client._id, email: client.email },
                process.env.JWT_SECRET || "secret_temporary_key", // Utilisez une clé sécurisée
                { expiresIn: "1h" }
            );

            console.log("Token généré :", token);

            res.status(200).json({ message: "Connexion réussie", token });
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            res.status(500).json({ message: "Erreur lors de la connexion", error });
        }
    },
};

module.exports = clientController;
