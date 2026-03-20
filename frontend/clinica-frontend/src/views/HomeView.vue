<template>
  <div class="login-container">
    <div class="login-box">
      <h1>🏥 Clínica Médica</h1>
      <p>Acesse sua conta</p>
      
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>E-mail</label>
          <input v-model="email" type="email" placeholder="seu@email.com" required />
        </div>

        <div class="input-group">
          <label>Senha</label>
          <input v-model="senha" type="password" placeholder="******" required />
        </div>

        <button type="submit" :disabled="carregando">
          {{ carregando ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <p v-if="erro" class="error-msg">{{ erro }}</p>
      
      <div class="footer">
        <span>Não tem conta? <router-link to="/register">Cadastre-se aqui</router-link></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // 1. Importação essencial

const email = ref('');
const senha = ref('');
const erro = ref('');
const carregando = ref(false);
const router = useRouter(); // 2. Inicialização essencial

const handleLogin = async () => {
  erro.value = '';
  carregando.value = true;
  
  try {
    // Usando 127.0.0.1 para não ter erro de conexão
    const response = await axios.post('https://proviclinica.onrender.com/api/auth/login', {
  email: email.value,
  senha: senha.value
});
    
    // Salva os dados para a Dashboard usar
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('usuario', JSON.stringify(response.data.usuario));

    alert('Login realizado com sucesso! 🎉');
    
    // 3. O comando que faz a mágica de trocar a tela
    router.push('/dashboard'); 
    
  } catch (err) {
    if (err.response && err.response.data.msg) {
      erro.value = err.response.data.msg;
    } else {
      erro.value = 'Erro ao conectar com o servidor.';
    }
  } finally {
    carregando.value = false;
  }
};
</script>

<style scoped>
.login-container { display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #eef2f3; }
.login-box { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 350px; text-align: center; }
.input-group { text-align: left; margin-bottom: 1rem; }
label { display: block; margin-bottom: 5px; font-weight: bold; }
input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
button { width: 100%; padding: 12px; background-color: #42b983; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; }
.error-msg { color: #e74c3c; margin-top: 1rem; }
.footer { margin-top: 1.5rem; font-size: 0.85rem; }
</style>
