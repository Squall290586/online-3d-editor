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
                       small>
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
                        small
                        slot="activator">
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
                        small
                        slot="activator">
                    <v-icon>settings</v-icon>
                </v-btn>
                <span>Paramètres</span>
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
                        this.$store.dispatch("userSignOut")
                        break
                    case "showUserSettings":
                        this.$store.dispatch("showUserSettings")
                        break
                    case "new":
                        this.$store.dispatch("resetScene")
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
            }
        }
    };
</script>
