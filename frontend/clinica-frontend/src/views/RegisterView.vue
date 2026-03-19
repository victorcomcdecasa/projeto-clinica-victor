<template>
  <div class="register-container">
    <div class="register-box">
      <h2>📝 Cadastro de Paciente</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="form.nome" type="text" placeholder="Nome Completo" required />
        <input v-model="form.email" type="email" placeholder="E-mail" required />
        <input v-model="form.senha" type="password" placeholder="Senha" required />
        
        <hr />

        <div class="cep-group">
          <input 
            v-model="form.cep" 
            type="text" 
            placeholder="CEP (ex: 01001000)" 
            @blur="buscarCEP" 
          />
          <small v-if="buscandoCep">Buscando endereço...</small>
        </div>

        <input v-model="form.logradouro" type="text" placeholder="Logradouro" readonly />
        <input v-model="form.bairro" type="text" placeholder="Bairro" readonly />
        <input v-model="form.cidade" type="text" placeholder="Cidade" readonly />

        <button type="submit">Finalizar Cadastro</button>
      </form>
      
      <router-link to="/">Voltar para o Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const buscandoCep = ref(false);

const form = ref({
  nome: '',
  email: '',
  senha: '',
  cep: '',
  logradouro: '',
  bairro: '',
  cidade: ''
});

// Função que chama o SEU backend para buscar o CEP
const buscarCEP = async () => {
  if (form.value.cep.length === 8) {
    buscandoCep.value = true;
    try {
      const res = await axios.get(`http://127.0.0.1:5000/api/services/cep/${form.value.cep}`);
      form.value.logradouro = res.data.logradouro;
      form.value.bairro = res.data.bairro;
      form.value.cidade = res.data.localidade;
    } catch (err) {
      alert("Erro ao buscar CEP. Verifique se o backend está rodando!");
    } finally {
      buscandoCep.value = false;
    }
  }
};

const handleRegister = async () => {
  try {
    await axios.post('http://127.0.0.1:5000/api/auth/register', form.value);
    alert('Cadastro realizado! Agora faça login.');
    router.push('/');
  } catch (err) {
    alert(err.response?.data?.msg || 'Erro no cadastro');
  }
};
</script>

<style scoped>
.register-container { display: flex; justify-content: center; padding: 20px; }
.register-box { background: white; padding: 2rem; border-radius: 8px; width: 100%; max-width: 400px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
input { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
input[readonly] { background-color: #f9f9f9; cursor: not-allowed; }
button { width: 100%; padding: 12px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
hr { margin: 20px 0; border: 0; border-top: 1px solid #eee; }
a { display: block; margin-top: 15px; text-align: center; color: #3498db; text-decoration: none; }
</style>