const Voyage = require("../models/voyage");

const voyageController = {
    // Récupérer tous les voyages
    getAllVoyages: async (req, res) => {
        try {
            const voyages = await Voyage.find(); // Trouver tous les voyages
            res.status(200).json(voyages);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des voyages", error });
        }
    },

    // Récupérer un voyage par ID
    getVoyageById: async (req, res) => {
        try {
            const voyage = await Voyage.findOne({ idVoyage: req.params.id });
            if (!voyage) {
                return res.status(404).json({ message: "Voyage non trouvé" });
            }
            res.status(200).json(voyage);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération du voyage", error });
        }
    },

    // Ajouter un nouveau voyage
    addVoyage: async (req, res) => {
        try {
            const newVoyage = new Voyage(req.body);
            await newVoyage.save();
            res.status(201).json(newVoyage);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de l'ajout du voyage", error });
        }
    },

    // Mettre à jour un voyage par ID
    updateVoyage: async (req, res) => {
        console.log("Données reçues :", req.body);
        console.log("ID du voyage :", req.params.id);
      
        try {
          const updatedVoyage = await Voyage.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
          );
      
          if (!updatedVoyage) {
            return res.status(404).json({ message: "Voyage non trouvé" });
          }
      
          res.status(200).redirect("/admin/voyages")
        } catch (error) {
          console.error("Erreur :", error);
          res.status(500).json({ message: "Erreur lors de la mise à jour du voyage", error });
        }
      },
      
      

    // Supprimer un voyage par ID
    deleteVoyage: async (req, res) => {
        try {
            const deletedVoyage = await Voyage.findByIdAndDelete(req.params.id); // Utilisez findByIdAndDelete
            if (!deletedVoyage) {
                return res.status(404).json({ message: "Voyage non trouvé" });
            }
            res.status(200).json({ message: "Voyage supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du voyage", error });
        }
    },    
};

module.exports = voyageController;
