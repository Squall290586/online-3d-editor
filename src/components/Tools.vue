<template>
  <v-layout class="bottom-right">
    <v-flex :key="tool.action" v-for="tool in items" xs12>
      <v-btn @click="handleSelect(tool.action)" fab :color="color(tool.action)">
        <v-icon v-text="tool.icon"></v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "Tools",
    data() {
      return {
        type: "remove",
        items: [
          {
            title: "Ajouter",
            icon: "add",
            action: "add"
          },
          {
            title: "Supprimer",
            icon: "remove",
            action: "remove"
          }
        ]
      };
    },
    methods: {
      handleSelect(action) {
        switch (action) {
          case "add":
            this.$store.commit('setAction', 'add')
            break
          case "remove":
            this.$store.commit('setAction', 'remove')
            break
          default:
            break
        }
        this.type = action
      },
      color(action) {
        return this.type === action ? "primary" : ""
      }
    }
  };
</script>

<style>
  .bottom-right {
    position: fixed;
    bottom: 50px;
    right: 0;
    flex-direction: column;
  }
</style>
