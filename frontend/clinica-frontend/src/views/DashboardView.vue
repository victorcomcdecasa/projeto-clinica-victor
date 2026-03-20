<template>
  <button @click="fazerAgendamento" class="btn btn-primary">Agendar</button>

<hr /> <div class="mt-5">
  <h3 class="mb-4">Minhas Consultas Agendadas</h3>
  
  <div v-if="agendamentos.length > 0" class="table-responsive">
    <table class="table table-hover table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Especialidade</th>
          <th>Data</th>
          <th>Hora</th>
          <th>Clima Previsto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in agendamentos" :key="item._id">
          <td>{{ item.especialidade }}</td>
          <td>{{ new Date(item.data).toLocaleDateString('pt-BR') }}</td>
          <td>{{ item.hora }}</td>
          <td>{{ item.climaNaHora }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else class="alert alert-info">
    Você ainda não possui agendamentos.
  </div>
</div>
  <div class="dashboard-container">
    <nav class="navbar">
      <h1>🏥 Painel da Clínica</h1>
      <div class="user-menu">
        <span>Olá, <strong>{{ nomeUsuario }}</strong></span>
        <button @click="handleLogout" class="btn-logout">Sair</button>
      </div>
    </nav>

<main class="content">
  <div class="card agendamento-form">
    <h3>📅 Novo Agendamento</h3>
    <form @submit.prevent="fazerAgendamento">
      <select v-model="novoAgendamento.especialidade" required>
        <option value="">Selecione a Especialidade</option>
        <option value="Cardiologia">Cardiologia</option>
        <option value="Clínico Geral">Clínico Geral</option>
        <option value="Pediatria">Pediatria</option>
      </select>
      <input type="date" v-model="novoAgendamento.data" required />
      <input type="time" v-model="novoAgendamento.hora" required />
      <button type="submit" class="btn-primary">Confirmar Agendamento</button>
    </form>
  </div>
  
  </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const nomeUsuario = ref('Usuário');
const clima = ref(null);
const cidade = ref('Rio de Janeiro'); // Você pode mudar para sua cidade
const novoAgendamento = ref({
  especialidade: '',
  data: '',
  hora: ''
});

const fazerAgendamento = async () => {
  try {
    const token = localStorage.getItem('token');
    
    // O endereço TEM que ser esse aqui (confira barra por barra):
    await axios.post('https://proviclinica.onrender.com/api/services/agendar', {
      especialidade: novoAgendamento.value.especialidade,
      data: novoAgendamento.value.data,
      hora: novoAgendamento.value.hora,
      climaNaHora: clima.value ? clima.value.descricao : 'Céu limpo'
    }, {
      headers: { 
        'x-auth-token': token 
      }
    });

    alert('Agendamento realizado! 🏥');
    // ... restante do código
  } catch (err) {
    console.error("ERRO DETALHADO:", err.response); // Isso aqui é vital
    alert('Erro ao agendar.');
  }
  
};

const agendamentos = ref([]);

const buscarAgendamentos = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('https://proviclinica.onrender.com/api/services/meus-agendamentos', {
      headers: { 'x-auth-token': token }
    });
    agendamentos.value = res.data;
  } catch (err) {
    console.error("Erro ao carregar lista", err);
  }
};

// Chamar a busca assim que a tela carregar
onMounted(() => {
  buscarAgendamentos();
});

onMounted(async () => {
  // 1. Recupera nome do usuário
  const usuario = localStorage.getItem('usuario');
  if (usuario) {
    const dados = JSON.parse(usuario);
    nomeUsuario.value = dados.nome;
  } else {
    router.push('/');
  }

  // 2. Busca o clima no seu Backend
  try {
    const res = await axios.get(`https://proviclinica.onrender.com/api/services/clima/${cidade.value}`);
    clima.value = res.data;
  } catch (err) {
    console.error("Erro ao carregar clima:", err);
  }
});

const handleLogout = () => {
  localStorage.clear();
  router.push('/');
};
</script>

<style scoped>
.dashboard-container { min-height: 100vh; background: #f0f4f8; font-family: sans-serif; }
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 5%; background: #2c3e50; color: white; }
.btn-logout { background: #e74c3c; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; margin-left: 10px; }

.content { padding: 2rem 5%; max-width: 1100px; margin: 0 auto; }

/* Estilo do Card de Clima */
.weather-card { 
  background: white; 
  border-radius: 12px; 
  display: flex; 
  overflow: hidden; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}
.weather-info { padding: 1.5rem; flex: 1; }
.temp { font-size: 2.5rem; font-weight: bold; color: #2c3e50; margin: 0; }
.desc { text-transform: capitalize; color: #7f8c8d; }

.weather-alert { 
  padding: 1.5rem; 
  width: 30%; 
  background: #d4edda; 
  color: #155724; 
  display: flex; 
  align-items: center; 
  text-align: center;
  font-weight: bold;
}
.rain-bg { background: #fff3cd; color: #856404; }

.grid-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
.btn-primary { width: 100%; padding: 10px; background: #42b983; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-top: 10px;}
.btn-secondary { width: 100%; padding: 10px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-top: 10px;}
</style>
