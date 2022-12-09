<template>
  <div class="loading">
    <img src="@/assets/loading.gif" alt="Loading" width="100" height="100" />
  </div>
</template>

<script>
export default {
  name: "loading-layout",
};
</script>

<style>
.loading {
  grid-area: content;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>