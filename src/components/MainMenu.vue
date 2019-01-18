<template>
  <v-navigation-drawer absolute mini-variant permanent v-model="drawer">
    <v-toolbar class="transparent" flat>
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="user.photoURL">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{user.displayName}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list dense>
      <v-divider></v-divider>

      <template v-for="item in items">
        <v-list-group :key="item.title" :prepend-icon="item.icon" v-if="item.items">
          <v-list-tile slot="activator">
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :key="i.title" @click="handleSelect(i.action)" v-for="i in item.items">
            <v-list-tile-action>
              <v-icon>{{ i.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ i.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile :key="item.title" @click="handleSelect(item.action)" v-else>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "MainMenu",
  data() {
    return {
      user: this.$store.state.user,
      drawer: true,
      items: [
        {
          title: "Dessins",
          icon: "edit",
          action: "drawing"
        },
        {
          title: "Formes",
          icon: "lens",
          action: "shapes"
        },
        {
          title: "Intersection",
          icon: "compare",
          action: "intersect"
        },
        {
          title: "Mesures",
          icon: "straighten",
          action: "rules"
        },
        {
          title: "Déconnexion",
          icon: "meeting_room",
          action: "disconnect"
        }
      ]
    };
  },
  methods: {
    handleSelect(key) {
      switch (key) {
        case "disconnect":
          this.signOut();
          break;
        default:
          break;
      }
    },
    signOut() {
      this.$store.dispatch("userSignOut");
    }
  }
};
</script>

<style>
</style>
