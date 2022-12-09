<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/logo.png" width="100" />
      <hr />
      <div class="auth-title">{{ showSignup ? "Cadastro" : "Login" }}</div>
      <input
        type="text"
        v-if="showSignup"
        v-model="user.name"
        placeholder="Nome"
        name="nome"
        required
      />
      <input
        type="email"
        v-model="user.email"
        placeholder="E-mail"
        name="email"
        required
      />
      <input
        type="password"
        v-model="user.password"
        placeholder="Senha"
        name="password"
        required
      />
      <input
        type="password"
        v-model="user.confirmPassword"
        placeholder="Confirme a senha"
        v-if="showSignup"
        name="password"
        required
      />
      <button v-if="showSignup" @click="signup">Registrar</button>
      <button v-else @click="signin">Entrar</button>
      <a href="" @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">Já tem cadastro? Acesse o Login !</span>
        <span v-else>Não tem cadastro? Registre-se aqui !</span>
      </a>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { showError, userKey } from "@/global";

export default {
  name: "auth-area",
  data() {
    return {
      showSignup: false,
      user: {},
    };
  },
  methods: {
    signin() {
      this.$http
        .post("/signin", this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      this.$http
        .post("/signup", this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #bbb;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: flex-end;
  background-color: #2460ae;
  color: #ffffff;
  padding: 5px 15px;
}

.auth-modal a {
  margin-top: 35px;
}

.auth-modal hr {
  border: 0;
  width: 100px;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>