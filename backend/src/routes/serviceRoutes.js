const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const appointmentController = require('../controllers/appointmentController');

router.get('/meus-agendamentos', auth, appointmentController.getMyAppointments);
router.get('/cep/:cep', appointmentController.getCEP);
router.get('/clima/:cidade', appointmentController.getClima);
router.post('/agendar', auth, appointmentController.createAppointment);

module.exports = router;