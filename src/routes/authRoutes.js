const express = require("express");
const router = express.Router();

// Exemple de contrôleur (doit être défini ou importé)
const loginController = async (req, res) => {
    const { email, password } = req.body;
    // Exemple de logique pour le login
    if (email === "admin@example.com" && password === "password") {
        res.send("Login réussi !");
    } else {
        res.status(401).send("Identifiants incorrects");
    }
};

// Route POST pour le login
router.post("/login", loginController);

module.exports = router;
