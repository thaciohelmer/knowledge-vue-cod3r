<template>
  <div>
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento" />
    <div class="stats">
      <StatViewer
        title="Categorias"
        :value="stat.categories"
        icon="fa fa-folder"
        color="#d54d50"
      />
      <StatViewer
        title="Artigos"
        :value="stat.articles"
        icon="fa fa-file"
        color="#3bc480"
      />
      <StatViewer
        title="Usuários"
        :value="stat.users"
        icon="fa fa-user"
        color="#3282cd"
      />
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/page-title.vue";
import StatViewer from "./stat-viewer.vue";

export default {
  name: "app-home",
  components: { PageTitle, StatViewer },
  data() {
    return {
      stat: {},
    };
  },
  methods: {
    getStats() {
      this.$http.get("stats").then((res) => (this.stat = res.data));
    },
  },
  mounted() {
    this.getStats();
  },
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>