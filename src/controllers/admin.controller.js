const Client = require('../models/client');
const Reservation = require('../models/reservation');
const Voyage = require('../models/voyage');

// Render dashboard with statistics
const renderDashboard = async (req, res) => {
  try {
    const totalPClient = await Client.countDocuments();
    const totalVoyage = await Voyage.countDocuments();
    const totalReservation = await Reservation.countDocuments();
    res.render('admin/dashboard', {
        totalPClient,
        totalVoyage,
        totalReservation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading dashboard');
  }
};

// Render clients page
const renderClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.render('admin/clients', { clients });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading clients');
  }
};

// Render voyages page
const renderVoyages = async (req, res) => {
  try {
    const voyages = await Voyage.find();
    res.render('admin/voyages', { voyages });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading voyages');
  }
};

// Render reservations page
const renderReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('client')  // Peuple le champ 'client' dans la réservation
      .populate('voyage'); // Peuple le champ 'voyage' dans la réservation
    
    res.render('admin/reservations', { reservations });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading reservations');
  }
};

module.exports = {
  renderDashboard,
  renderClients,
  renderVoyages,
  renderReservations,
};
