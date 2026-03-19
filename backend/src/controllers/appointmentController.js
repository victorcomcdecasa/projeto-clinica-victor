const axios = require('axios');
const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const { especialidade, data, hora, climaNaHora } = req.body;

    // --- A MUDANÇA ESTÁ AQUI ---
    const novoAgendamento = new Appointment({
      pacienteId: req.user.userId, // <--- Mudamos de .id para .userId para bater com o seu log
      especialidade,
      data,
      hora,
      climaNaHora: climaNaHora || 'Céu limpo'
    });

    await novoAgendamento.save();
    res.status(201).json({ msg: 'Consulta agendada com sucesso! 🎉' });
    
  } catch (err) {
    console.error("ERRO NO MONGODB:", err.message);
    res.status(500).send('Erro ao salvar agendamento');
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    // Busca no banco todos os agendamentos onde o pacienteId é o do usuário logado
    const appointments = await Appointment.find({ pacienteId: req.user.userId }).sort({ data: 1 });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro ao buscar agendamentos');
  }
};

exports.getCEP = async (req, res) => {
    try {
        const { cep } = req.params;
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        res.json(response.data);
    } catch (err) {
        res.status(500).send('Erro ao buscar CEP');
    }
}; 

exports.getEndereco = async (req, res) => {
  try {
    const { cep } = req.params;
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    
    if (response.data.erro) {
      return res.status(400).json({ msg: 'CEP não encontrado' });
    }
    
    res.json(response.data);
  } catch (err) {
    res.status(500).send('Erro ao buscar CEP');
  }
};

exports.getClima = async (req, res) => {
  try {
    const { cidade } = req.params;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    );

    const clima = {
      temp: response.data.main.temp,
      descricao: response.data.weather[0].description,
      alertaChuva: response.data.weather[0].main.toLowerCase().includes('rain')
    };

    res.json(clima);
  // No catch da função getClima:
} catch (err) {
    console.log("ERRO REAL DO CLIMA:", err.response ? err.response.data : err.message);
    res.status(500).send('Erro ao buscar clima');
}
};