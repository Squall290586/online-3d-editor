<template>
  <div>
    <v-speed-dial
            direction="left"
            fixed
            right
            top
            v-model="options"
    >
      <v-btn
              fab
              slot="activator"
              v-model="options"
      >
      </v-btn>
      <v-btn :color="item.color"
             :key="item.title"
             dark
             fab
             small
             v-for="item in items.items"
             @click="handleSelect(item.action)"
      >
        <v-icon v-text="item.icon"></v-icon>
      </v-btn>
    </v-speed-dial>
    <v-speed-dial
            direction="bottom"
            fixed
            right
            top
            v-model="options"
    >
      <v-btn
              :color=items.color
              dark
              fab
              slot="activator"
              v-model="options"
      >
        <v-icon v-text="items.icon"></v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
             dark
             fab
             small
             @click="handleSelect('disconnect')"
      >
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
  export default {
    name: "Options",
    data() {
      return {
        options: false,
        disconnect: false,
        items: {
          title: "Fichier",
          icon: "account_circle",
          color: "green darken-2",
          items: [
            {
              title: "Nouveau",
              icon: "insert_drive_file",
              action: "new",
              color: ""
            },
            {
              title: "Ouvrir",
              icon: "folder_open",
              action: "open",
              color: "yellow darken-1"
            },
            {
              title: "Sauvegarder",
              icon: "save",
              action: "save",
              color: "red darken-2"
            },
            {
              title: "Partager",
              icon: "share",
              action: "share",
              color: "blue darken-2"
            }
          ]
        }
      };
    },
    methods: {
      handleSelect(key) {
        switch (key) {
          case "disconnect":
            this.signOut();
            break;
          case "save":
            this.save();
            break;
          case "open":
            this.load()
            break;
          default:
            break;
        }
      },
      signOut() {
        this.$store.dispatch("userSignOut");
      },
      load() {
        this.$store.dispatch("load");
        this.$store.dispatch("chooseFile")
      },
      save() {
        this.$store.dispatch("save");
      }
    }
  };
</script>
