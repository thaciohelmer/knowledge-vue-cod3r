<template>
  <div class="article-admin">
    <b-form class="mb-4">
      <input type="hidden" id="category-id" v-model="category.id" />
      <b-row>
        <b-col xs="12">
          <b-form-group label="Nome" label-for="category-name">
            <b-form-input
              id="category-name"
              type="text"
              v-model="category.name"
              placeholder="Informe o nome da categoria"
              :readonly="mode === 'remove'"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Categoria Pai" label-for="category-parentId">
            <b-form-select
              id="category-parentId"
              :options="categories"
              v-model="category.parentId"
            ></b-form-select>
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
    <b-table hover striped :items="categories" :fields="fields">
      <template #cell(actions)="data">
        <b-button
          variant="warning"
          @click="loadCategory(data.item)"
          class="mr-2"
          ><i class="fa fa-pencil"></i
        ></b-button>
        <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
          <div class="fa fa-trash"></div>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { showError } from "@/global";
export default {
  name: "category-admin",
  data() {
    return {
      mode: "save",
      categories: [],
      category: {},
      fields: [
        { key: "id", label: "Id", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        {
          key: "parentId",
          label: "Id do pai",
          sortable: true,
          class: "d-none",
        },
        { key: "path", label: "Caminho", sortable: true },
        {
          key: "actions",
          label: "Ações",
        },
      ],
    };
  },
  methods: {
    loadCategories() {
      this.$http.get("/categories").then((res) => {
        //this.categories = res.data
        this.categories = res.data.map((category) => {
          return { ...category, value: category.id, text: category.path };
        });
      });
    },
    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = {
        id: category.id,
        name: category.name,
        parentId: category.parentId,
      };
    },
    reset() {
      (this.mode = "save"), (this.category = {});
      this.loadCategories();
    },
    save() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `${this.category.id}` : "";
      this.$http[method]("/categories/" + id, this.category)
        .then(() => {
          showError;
          this.reset();
        })
        .catch(() => showError);
    },
    remove() {
      const id = this.category.id;
      this.$http
        .delete("/categories/" + id)
        .then(() => {
          showError;
          this.reset();
        })
        .catch(() => showError);
    },
  },
  mounted() {
    this.loadCategories();
  },
};
</script>

<style>
</style>