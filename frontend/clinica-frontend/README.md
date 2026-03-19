# 🏥 Sistema de Gestão de Clínica Médica

Este é um projeto Full Stack desenvolvido como parte de um trabalho acadêmico. O sistema permite o cadastro de usuários, login autenticado e o agendamento de consultas médicas com integração de APIs externas.

## 🚀 Funcionalidades Principais

- **Autenticação:** Sistema de login e cadastro com criptografia de senha e tokens JWT.
- **Cadastro Inteligente:** Integração com a **API ViaCEP** para preenchimento automático de endereço.
- **Agendamento Dinâmico:** Permite marcar consultas escolhendo especialidade, data e hora.
- **Previsão do Tempo:** Integração com a **API OpenWeatherMap** para exibir o clima no momento do agendamento.
- **Painel do Paciente:** Listagem em tempo real de todas as consultas marcadas pelo usuário logado.

## 🛠️ Tecnologias Utilizadas

**Frontend:**
- [Vue.js 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/) (Consumo de APIs)
- [Bootstrap](https://getbootstrap.com/) (Estilização)

**Backend:**
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Banco de dados NoSQL)
- [JSON Web Token (JWT)](https://jwt.io/) (Segurança)
- [Mongoose](https://mongoosejs.com/) (Modelagem de dados)

## 🔧 Como Rodar o Projeto

1. **Clonar/Extrair o projeto.**
2. **Configurar o Backend:**
   - Acesse a pasta `backend`.
   - Execute `npm install`.
   - Crie um arquivo `.env` com as chaves:
     ```env
     MONGO_URI=sua_conexao_mongodb
     JWT_SECRET=seu_segredo_super_seguro
     OPENWEATHER_KEY=sua_chave_da_api
     ```
   - Inicie com `npm run dev`.
3. **Configurar o Frontend:**
   - Acesse a pasta `frontend`.
   - Execute `npm install`.
   - Inicie com `npm run dev`.

---
Desenvolvido por **Victor** - 2026