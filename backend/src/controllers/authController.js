const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// FUNÇÃO DE REGISTRO (A que já funcionava)
exports.register = async (req, res) => {
  try {
    const { nome, email, senha, tipo, cep, logradouro, bairro, cidade } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Este e-mail já está cadastrado.' });

    user = new User({ nome, email, senha, tipo, cep, logradouro, bairro, cidade });
    await user.save();
    res.status(201).json({ msg: 'Usuário criado com sucesso!', usuario: user.nome });
  } catch (err) {
    console.log("ERRO NO REGISTRO:", err);
    res.status(500).send('Erro interno no servidor');
  }
};

// FUNÇÃO DE LOGIN (Nova)
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 1. Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenciais inválidas' });

    // 2. Comparar a senha
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciais inválidas' });

    // 3. Gerar Token JWT
    const payload = { userId: user._id, tipo: user.tipo };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      usuario: { id: user._id, nome: user.nome, tipo: user.tipo }
    });
  } catch (err) {
    console.error("ERRO NO LOGIN:", err);
    res.status(500).send('Erro no servidor');
  }
};