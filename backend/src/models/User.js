const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ['paciente', 'secretario'], default: 'paciente' },
  cep: { type: String },
  logradouro: { type: String },
  bairro: { type: String },
  cidade: { type: String }
}, { timestamps: true });

// Forma mais segura de evitar o erro "next is not a function"
UserSchema.pre('save', async function() {
  if (this.isModified('senha')) {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
  }
});

module.exports = mongoose.model('User', UserSchema);