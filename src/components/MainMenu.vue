<template>
  <v-navigation-drawer :mini-variant.sync="mini" v-model="drawer" absolute permanent v-click-outside="outside">
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="user.photoURL">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{user.displayName}}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list dense>
      <v-divider></v-divider>

      <template v-for="item in items">
        <v-list-group :key="item.title" v-if="item.items" :prepend-icon="item.icon">
          <v-list-tile slot="activator">
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-for="i in item.items" :key="i.title" @click="handleSelect(i.action)">
            <v-list-tile-action>
              <v-icon>{{ i.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ i.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else :key="item.title" @click="handleSelect(item.action)">
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
      mini: true,
      items: [
        {
          title: "Fichier",
          icon: "folder",
          items: [
            {
              title: "Nouveau",
              icon: "insert_drive_file",
              action: "new"
            },
            {
              title: "Ouvrir",
              icon: "folder_open",
              action: "open"
            },
            {
              title: "Sauvegarder",
              icon: "save",
              action: "save"
            },
            {
              title: "Partager",
              icon: "share",
              action: "share"
            }
          ]
        },
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
    outside() {
      this.mini = true;
    },
    signOut() {
      this.$store.dispatch("userSignOut");
    }
  },
  directives: {
    "click-outside": {
      bind(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }

          console.warn(warn);
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },

      unbind(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>

<style>
</style>
