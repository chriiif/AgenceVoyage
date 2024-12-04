const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const adminMiddleware = require("../middleware/adminMiddleware");
const Client = require("../models/client");
const Voyage = require("../models/voyage");
const Reservation = require("../models/reservation");
const Admin = require("../models/admin");

// Controllers
const {
    renderDashboard,
    renderClients,
    renderVoyages,
    renderReservations,
} = require("../controllers/admin.controller");
const { addClient } = require("../controllers/clientController");

// Admin Dashboard
router.get("/dashboard", adminMiddleware, (req, res) => {
    console.log("Admin session:", req.session.user);
    renderDashboard(req, res);
});

// Admin Authentication
router.get("/login", (req, res) => {
    res.render("admin/login");
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).send("Admin not found");
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).send("Invalid credentials");
        }

        // Login successful
        req.session.user = { role: "admin", username: admin.username };
        res.redirect("/admin/dashboard");
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error logging in");
    }
});

router.post("/create", async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).send("Username already in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();
        res.status(201).send("Admin created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating admin");
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect("/admin/dashboard");
        }
        res.redirect("/admin/login");
    });
});

// Client Management
router.get("/clients", adminMiddleware, renderClients);
router.post("/client/create", adminMiddleware, addClient);
router.post("/client/delete/:id", adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        await Client.findByIdAndDelete(id);
        res.redirect("/admin/clients");
    } catch (error) {
        console.error("Error deleting client:", error);
        res.status(500).send("Error deleting client");
    }
});

// Voyage Management
router.get("/voyages", adminMiddleware, renderVoyages);
router.post("/voyage/delete/:id", adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        await Voyage.findByIdAndDelete(id);
        res.redirect("/admin/voyages");
    } catch (error) {
        console.error("Error deleting voyage:", error);
        res.status(500).send("Error deleting voyage");
    }
});

// Reservation Management
router.get("/reservations", adminMiddleware, renderReservations);
router.post("/reservation/delete/:id", adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        await Reservation.findByIdAndDelete(id);
        res.redirect("/admin/reservations");
    } catch (error) {
        console.error("Error deleting reservation:", error);
        res.status(500).send("Error deleting reservation");
    }
});
router.post('/voyage/add', async (req, res) => {
    try {
      const {  destination, datedepart, dateretour, prix } = req.body;
      const newVoyage = new Voyage({

        destination,
        datedepart,
        dateretour,
        prix
      });
  
      await newVoyage.save();
      res.redirect('/admin/voyages'); // Redirect back to the voyages page after adding
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding voyage');
    }
  });
  
module.exports = router;
