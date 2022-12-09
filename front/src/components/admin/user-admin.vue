<template>
  <div class="article-admin">
    <b-form class="mb-4">
      <input type="hidden" id="user-id" v-model="user.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              placeholder="Informe o nome do usuário"
              :readonly="mode === 'remove'"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Email:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              placeholder="Informe E-mail do usuário"
              :readonly="mode === 'remove'"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-form-checkbox
        id="user-admin"
        v-model="user.admin"
        class="my-3"
        v-show="mode === 'save'"
        >Administrador?</b-form-checkbox
      >
      <b-row class="mb-2" v-show="mode === 'save'">
        <b-col md="6" sm="12">
          <b-form-group label="Senha:" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              placeholder="Informe a senha usuário"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group
            label="Confirmação de senha:"
            label-for="user-confirm-password"
          >
            <b-form-input
              id="user-confirm-password"
              type="password"
              v-model="user.confirmPassword"
              placeholder="Confirme a senha do usuário"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save"
            >Salvar</b-button
          >
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove"
            >Excluir</b-button
          >
          <b-button class="ml-2" @click="reset">Cancelar</b-button></b-col
        >
      </b-row>
    </b-form>
    <b-table hover striped :items="users" :fields="fields">
      <template #cell(actions)="data">
        <b-button variant="warning" @click="loadUser(data.item)" class="mr-2"
          ><i class="fa fa-pencil"></i
        ></b-button>
        <b-button variant="danger" @click="loadUser(data.item, 'remove')">
          <div class="fa fa-trash"></div>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { showError } from "@/global";
export default {
  name: "user-admin",
  data() {
    return {
      mode: "save",
      user: {},
      users: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formatter: (value) => (value === "true" ? "Sim" : "Não"),
        },
        {
          key: "actions",
          label: "Ações",
        },
      ],
    };
  },
  methods: {
    loadUsers() {
      this.$http.get("/users").then((res) => (this.users = res.data));
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    },
    reset() {
      (this.mode = "save"), (this.user = {});
      this.loadUsers();
    },
    save() {
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `${this.user.id}` : "";
      this.$http[method]("/users/" + id, this.user)
        .then(() => {
          showError;
          this.reset();
        })
        .catch(() => showError);
    },
    remove() {
      const id = this.user.id;
      this.$http
        .delete("/users/" + id)
        .then(() => {
          showError;
          this.reset();
        })
        .catch(() => showError);
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
</style>