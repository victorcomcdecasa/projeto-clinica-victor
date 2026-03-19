const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Certifique-se que o caminho está certo
const appointmentController = require('../controllers/appointmentController');

// Rota de Agendamento
router.post('/agendar', auth, appointmentController.createAppointment);

// Outras rotas...
router.get('/cep/:cep', appointmentController.getCEP);
router.get('/clima/:cidade', appointmentController.getClima);

module.exports = router;