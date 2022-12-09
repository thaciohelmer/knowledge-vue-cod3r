<template>
  <div class="article-by-id">
    <PageTitle
      icon="fa fa-file-o"
      :main="article.name"
      :sub="article.description"
    />
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import "highlightjs/styles/dracula.css";
import hljs from "highlightjs/highlight.pack";
import PageTitle from "../template/page-title.vue";
export default {
  name: "article-by-id",
  components: { PageTitle },
  data() {
    return {
      article: {},
    };
  },
  mounted() {
    this.$http
      .get("/articles/" + this.$route.params.id)
      .then((res) => (this.article = res.data));
  },
  updated() {
    document.querySelectorAll(".article-content pre").forEach((e) => {
      hljs.highlightBlock(e);
    });
  },
};
</script>

<style>
.article-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
}

.article-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #1e1e1e;
  color: #ffffff;
}

.article-content img {
  max-width: 100%;
}

.article-content :last-child {
  margin-bottom: 0px;
}
</style>