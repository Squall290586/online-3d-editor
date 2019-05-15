<template>
  <div>
    <v-speed-dial
            direction="left"
            fixed
            right
            top
            v-model="options">
      <v-btn
              fab
              slot="activator"
              v-model="options">
      </v-btn>
      <v-tooltip :key="item.title" bottom v-for="item in items.items">
        <v-btn :color="item.color"
               @click="handleSelect(item.action)"
               dark
               fab
               slot="activator"
               small
               v-if="item.enable">
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
            v-model="options">

      <v-btn
              :color=items.color
              dark
              fab
              slot="activator"
              v-model="options">
        <v-icon v-text="items.icon"></v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-tooltip bottom>
        <v-btn
                @click="handleSelect('disconnect')"
                dark
                fab
                slot="activator"
                small>
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        <span>Deconnexion</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn
                @click="handleSelect('showUserSettings')"
                color="yellow"
                dark
                fab
                slot="activator"
                small>
          <v-icon>settings</v-icon>
        </v-btn>
        <span>Paramètres</span>
      </v-tooltip>
    </v-speed-dial>
    <v-dialog v-model="dialog" width="50%">
      <v-card>
        <v-card-title
                class="headline grey lighten-2"
                primary-title
        >
          Nouvelle forme
        </v-card-title>

        <v-form v-model="valid">
          <v-container>
            <v-layout column>
              <v-flex
                      xs12
              >
                <v-text-field
                        :rules="[rules.required, rules.counter]"
                        label="Hauteur"
                        v-model="hauteur"
                ></v-text-field>
              </v-flex>

              <v-flex
                      xs12
              >
                <v-text-field
                        :rules="[rules.required, rules.counter]"
                        label="Largeur"
                        v-model="largeur"
                ></v-text-field>
              </v-flex>

              <v-flex
                      xs12
              >
                <v-text-field
                        :rules="[rules.required, rules.counter]"
                        label="Profondeur"
                        v-model="profondeur"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
                  @click="dialog = false"
                  color="primary"
                  flat
          >
            Annuler
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
                  @click="create"
                  color="primary"
          >
            Créer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "Options",
    data() {
      return {
        dialog: false,
        valid: false,
        hauteur: 1,
        largeur: 1,
        profondeur: 1,
        rules: {
          required: value => !!value || 'Requis',
          counter: value => value > 0 && value <= 20 || 'Min 1, Max 20'
        },
        options: false,
        disconnect: false,
        items: {
          title: "Fichier",
          icon: "account_circle",
          color: "green darken-2",
          items: [
            {
              title: "Nouveau",
              enable: true,
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
              enable: true,
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
            this.$store.dispatch("userSignOut")
            break
          case "showUserSettings":
            this.$store.dispatch("showUserSettings")
            break
          case "new":
            this.dialog = true
            break
          case "save":
            this.$store.dispatch("save")
            break
          case "open":
            this.$store.dispatch("load")
            this.$store.dispatch("chooseFile")
            break
          case "print":
            this.$store.dispatch("print")
            break
          default:
            break
        }
      },
      create() {
        this.$store.dispatch('newShape', {
          unitSize: 5,
          x: this.largeur,
          y: this.profondeur,
          z: this.hauteur
        }).then(() => {
            this.$emit('initShape')
            this.dialog = false
        })
      }
    }
  };
</script>
