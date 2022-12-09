<template>
  <div class="article-item">
    <router-link :to="{ name: 'articleById', params: { id: article.id } }">
      <div class="article-item-image d-none d-sm-block">
        <img
          src="article.imageUrl"
          alt="Article"
          v-if="article.imageUrl"
          width="150"
          height="150"
        />
        <img
          src="@/assets/article.png"
          alt="Article"
          width="150"
          height="150"
        />
      </div>
      <div class="article-item-info">
        <h2>{{ article.name }}</h2>
        <p>{{ article.description }}</p>
        <span class="article-item-autor">
          <strong>Autor:</strong> {{ article.author }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "article-item",
  props: ["article"],
};
</script>

<style>
.article-item {
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, blue, 0.2);
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
  padding: 20px;
}

.article-item a,
.article-item a:hover {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: #000000;
}

.article-item-info h2 {
  font-size: 1.7rem;
}

.article-item-image {
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #aaa;
}

.article-item img {
  border-radius: 5px;
}

.article-item-info {
  display: flex;
  flex-direction: column;
  align-self: stretch;
}

.article-item-info p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
}
</style>