const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();

const clientRoutes = require("./src/routes/clientRoutes");
const reservationRoutes = require("./src/routes/reservationRoutes");
const voyageRoutes = require("./src/routes/voyageRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const authRoutes = require("./src/routes/authRoutes");
const adminRoutes = require("./src/routes/admin");

const app = express();
const session = require("express-session");

app.use(session({
    secret: "votre_clé_secrète_pour_signer_les_sessions", // Remplacez par une clé secrète
    resave: false, // Ne pas sauvegarder la session si elle n'est pas modifiée
    saveUninitialized: false, // Ne pas sauvegarder les sessions non initialisées
    cookie: { secure: false } // Mettre à `true` si vous utilisez HTTPS
}));

// Connexion à MongoDB
mongoose
    .connect("mongodb://localhost:27017/AgenceVoyage", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connecté avec succès"))
    .catch((err) => {
        console.error("Erreur de connexion à MongoDB :", err.message);
        process.exit(1);
    });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Configuration EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

console.log("Views directory set to:", path.join(__dirname, "src", "views"));
console.log('Views directory:', path.join(__dirname, 'src', 'views'));
console.log('Partials directory:', path.join(__dirname, 'src', 'views', 'partials'));




// Routes
app.use("/reservations", reservationRoutes);
app.use("/admin", adminRoutes);
app.use("/clients", clientRoutes);
app.use("/voyages", voyageRoutes);
app.use("/payments", paymentRoutes);
app.use("/auth", authRoutes);
app.use(adminRoutes)

app.listen(5000, () => {
    console.log("App running at port 5000");
});
