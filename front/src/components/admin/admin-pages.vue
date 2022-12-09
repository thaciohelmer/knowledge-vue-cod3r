<template>
  <div class="admin-pages">
    <PageTitle
      icon="fa fa-cogs"
      main="Administração do Sistema"
      sub="Cadastros & Cia"
    />
    <div class="admin-pages-tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Artigos" Active>
            <ArticleAdmin />
          </b-tab>
          <b-tab title="Categorias">
            <CategoryAdmin />
          </b-tab>
          <b-tab title="Usuários">
            <UserAdmin />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/page-title.vue";
import ArticleAdmin from "./article-admin.vue";
import CategoryAdmin from "./category-admin.vue";
import UserAdmin from "./user-admin.vue";

export default {
  name: "admin-pages",
  components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin },
};
</script>

<style>
</style>