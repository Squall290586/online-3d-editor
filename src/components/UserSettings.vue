<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog
            v-model="dialog"
            width="500">
        <v-card>
            <v-card-title
                    class="title font-weight-regular justify-space-between">
                <span>{{ title }}</span>
            </v-card-title>

            <v-form v-model="valid">
                <v-window v-model="step">
                    <v-window-item :value="0">
                        <v-card-text>
                            <v-text-field
                                    :rules="[ipValidation]"
                                    v-model="values[0]">
                                <template v-slot:label>
                                    192.168.0.25
                                </template>
                            </v-text-field>
                            <span class="caption grey--text text--darken-1">
                        This is the IP of your Octoprint instance.
                    </span>
                        </v-card-text>
                    </v-window-item>
                    <v-window-item :value="1">
                        <v-card-text>
                            <v-text-field
                                    :rules="[keyValidation]"
                                    v-model="values[1]">
                                <template v-slot:label>
                                    6616E824967245928903C0BB014CF163
                                </template>
                            </v-text-field>
                            <span class="caption grey--text text--darken-1">
                        This is the API key of your Octoprint instance.
                    </span>
                        </v-card-text>
                    </v-window-item>
                </v-window>
            </v-form>

            <v-card-actions>
                <v-btn
                        :disabled="step === 0"
                        flat
                        @click="step--">
                    Précédent
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                        :disabled="(step === 1 && !valid)"
                        color="primary"
                        depressed
                        @click="(step === 1) ? applyUserSettings() : step++">
                    {{(step === 1) ? "Ok" : "Suivant"}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import * as Optional from "optional-js";

    export default {
        name: "UserSettings",
        data() {
            return {
                "title": "Paramètres",
                "values": [],
                "step": 0,
                "valid": false
            };
        },
        computed: {
            dialog: {
                get() {
                    return this.$store.state.showUserSettings
                },
                set(v) {
                    this.$store.commit('setShowUserSettings', v)
                }
            }
        },
        methods: {
            ipValidation: (v) => {
                if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v)) {
                    return true;
                } else {
                    return "L'IP saisie est invalide !!";
                }
            },
            keyValidation: (v) => Optional
                .ofNullable(v)
                .map(v => v.length === 32)
                .filter(v => v)
                .orElse("L'API key saisie est invalide !!"),
            applyUserSettings() {
                this.$store.dispatch('applyUserSettings', {
                    ip: this.$data.values[0],
                    key: this.$data.values[1]
                });
            }
        }
    }
</script>

<style scoped>

</style>