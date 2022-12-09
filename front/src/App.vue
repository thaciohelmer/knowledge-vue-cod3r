<template>
  <div id="app" :class="{ 'hide-menu': !isMenuVisible || !user }">
    <HeaderLayout
      :hideToggle="!user"
      :hideUserDropdown="!user"
      title="Cod3r - Base de Conhecimento"
    />
    <MenuLayout v-if="user" />
    <LoadingLayout v-if="validatingToken" />
    <ContentLayout v-else />
    <FooterLayout />
  </div>
</template>

<script>
import HeaderLayout from "./components/template/header-layout.vue";
import ContentLayout from "./components/template/content-layout.vue";
import MenuLayout from "./components/template/menu-layout.vue";
import FooterLayout from "./components/template/footer-layout.vue";
import LoadingLayout from "./components/template/loading-layout.vue";

import { mapState } from "vuex";
import { userKey } from "./global";

export default {
  components: {
    HeaderLayout,
    ContentLayout,
    MenuLayout,
    FooterLayout,
    LoadingLayout,
  },
  computed: mapState(["isMenuVisible", "user"]),
  data() {
    return {
      validatingToken: true,
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);

      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        return this.$router.push({ name: "auth" });
      }

      const res = await this.$http.post("/validateToken", userData);

      if (res.data) {
        this.$store.commit("setUser", userData);
        if (this.$mq === "xs" || this.$mq === "sm") {
          this.$store.commit("toggleMenu", false);
          console.log(this.$mq);
        }
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      }

      this.validatingToken = false;
    },
  },
  created() {
    this.validateToken();
  },
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}
body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}
#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>
