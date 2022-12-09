<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input
        type="text"
        placeholder="Digite para filtrar"
        v-model="treeFilter"
        class="filter-field"
      />
    </div>
    <Tree
      :data="treeData"
      :options="treeOptions"
      :filter="treeFilter"
      ref="tree"
      @node:selected="onNodeSelect"
    />
  </aside>
</template>

<script>
import { mapState } from "vuex";
import Tree from "liquor-tree";
export default {
  name: "menu-layout",
  components: { Tree },
  data() {
    return {
      treeData: this.getTreeData(),
      treeOptions: {
        propertyNames: { text: "name" },
        filter: { emptyText: "Categoria não encontrada" },
      },
      treeFilter: "",
    };
  },
  methods: {
    getTreeData() {
      return this.$http.get("/categories/tree").then((res) => res.data);
    },
    onNodeSelect(node) {
      this.$router.push({
        name: "articlesByCategory",
        params: { id: node.id },
      });

      if (this.$mq === "xs" || this.$mq === "sm") {
        this.$store.commit("toggleMenu", false);
        console.log(this.$mq);
      }
    },
  },
  computed: mapState(["isMenuVisible"]),
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.menu span,
.menu span:hover {
  color: #fff;
  text-decoration: none;
}

.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.menu .tree-node:not(.selected) > .tree-content:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.tree-arrow.has-chield {
  filter: brightness(2);
}

.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}

.menu .menu-filter i {
  color: #aaa;
  margin-right: 10px;
}

.menu input {
  color: #ccc;
  font-size: 1.3rem;
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
}

.menu .tree-filter-empty {
  color: #ccc;
  margin-left: 20px;
  font-size: 1.3rem;
}
</style>