const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  especialidade: { type: String, required: true },
  data: { type: String, required: true },
  hora: { type: String, required: true },
  climaNaHora: { type: String }, // Opcional: para registrar como estava o tempo
  status: { type: String, default: 'Agendado' },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);