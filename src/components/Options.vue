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
      <v-tooltip :key="item.title" bottom v-for="item in items.items">
        <v-btn :color="item.color"
               @click="handleSelect(item.action)"
               dark
               fab
               slot="activator"
               small
        >
          <v-icon v-text="item.icon"></v-icon>
        </v-btn>
        <span>{{item.title}}</span>
      </v-tooltip>
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
      <v-tooltip bottom>
        <v-btn
                @click="handleSelect('disconnect')"
                dark
                fab
                small
                slot="activator"
        >
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        <span>Deconnexion</span>
      </v-tooltip>
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
              title: "Imprimer",
              icon: "print",
              action: "print",
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
            this.signOut()
            break
          case "save":
            this.save()
            break
          case "open":
            this.load()
            break
          case "print":
            this.print()
            break
          default:
            break
        }
      },
      signOut() {
        this.$store.dispatch("userSignOut")
      },
      load() {
        this.$store.dispatch("load")
        this.$store.dispatch("chooseFile")
      },
      save() {
        this.$store.dispatch("save")
      },
      print() {
        this.$store.dispatch("print")
      }
    }
  };
</script>
