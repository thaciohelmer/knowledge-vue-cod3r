<template>
  <div class="page-title">
    <h1><i v-if="icon" :class="icon" class="mr-2"></i>{{ main }}</h1>
    <h2>{{ sub }}</h2>
    <hr />
  </div>
</template>

<script>
export default {
  name: "page-title",
  props: ["icon", "main", "sub"],
};
</script>

<style>
.page-title h1 {
  margin: 0px;
}

.page-title h2 {
  color: #777777;
  margin-top: 5px;
  font-size: 1.3rem;
}
</style>