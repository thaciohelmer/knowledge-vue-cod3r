<template>
  <div class="article-admin">
    <b-form class="mb-4">
      <input type="hidden" id="article-id" v-model="article.id" />
      <b-row>
        <b-col xs="12">
          <b-form-group label="Nome" label-for="article-name">
            <b-form-input
              id="article-name"
              type="text"
              v-model="article.name"
              placeholder="Informe o nome do artigo"
              :readonly="mode === 'remove'"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-form-group label="Descrição" label-for="article-description">
            <b-form-input
              id="article-description"
              type="text"
              v-model="article.description"
              placeholder="Informe a descrição do artigo"
              :readonly="mode === 'remove'"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Imagem (URL)" label-for="article-image-url">
            <b-form-input
              id="article-image-url"
              type="text"
              v-model="article.imageUrl"
              placeholder="Informe a URL da imagem"
              :readonly="mode === 'remove'"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Categoria" label-for="article-categoryId">
            <b-form-select
              id="article-categoryId"
              :options="categories"
              v-model="article.categoryId"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Author" label-for="article-userId">
            <b-form-select
              id="article-userId"
              :options="users"
              v-model="article.userId"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-4" v-if="mode === 'save'">
        <b-col>
          <b-form-group label="Contúedo" label-for="article-content">
            <VueEditor
              v-model="article.content"
              placholder="Informe o conteúdo do artigo"
            />
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
    <b-table hover striped :items="articles" :fields="fields">
      <template #cell(actions)="data">
        <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2"
          ><i class="fa fa-pencil"></i
        ></b-button>
        <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
          <div class="fa fa-trash"></div>
        </b-button>
      </template>
    </b-table>
    <b-pagination
      size="md"
      v-model="page"
      :total-rows="count"
      :per-page="limit"
    ></b-pagination>
  </div>
</template>

<script>
import { showError } from "@/global";
import { VueEditor } from "vue2-editor";

export default {
  name: "article-admin",
  components: { VueEditor },
  data() {
    return {
      mode: "save",
      articles: [],
      article: {},
      categories: [],
      users: [],
      fields: [
        { key: "id", label: "Id", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "actions", label: "Ações", sortable: false },
      ],
      page: 1,
      limit: 0,
      count: 0,
    };
  },
  methods: {
    loadArticles() {
      this.$http.get("/articles?page=" + this.page).then((res) => {
        this.articles = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
    loadCategories() {
      this.$http.get("/categories").then((res) => {
        this.categories = res.data.map((category) => {
          return { ...category, value: category.id, text: category.path };
        });
      });
    },
    loadUsers() {
      this.$http.get("/users").then((res) => {
        this.users = res.data.map((user) => {
          return {
            ...user,
            value: user.id,
            text: `${user.name} - ${user.email}`,
          };
        });
      });
    },
    loadArticle(article, mode = "save") {
      this.mode = mode;
      this.$http
        .get("/articles/" + article.id)
        .then((res) => (this.article = res.data));
    },
    reset() {
      (this.mode = "save"), (this.article = {});
      this.loadArticles();
    },
    save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `${this.article.id}` : "";
      this.$http[method]("/articles/" + id, this.article)
        .then(() => {
          showError;
          this.reset();
        })
        .catch(() => showError);
    },
    remove() {
      const id = this.article.id;
      this.$http
        .delete("/articles/" + id)
        .then(() => {
          showError;
          this.reset();
        })
        .catch(() => showError);
    },
  },
  mounted() {
    this.loadArticles();
    this.loadCategories();
    this.loadUsers();
  },
  watch: {
    page() {
      this.loadArticles();
    },
  },
};
</script>

<style>
</style>