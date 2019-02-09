<template>
  <v-app id="app">
    <v-container fluid fill-height pa-0>
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>

html {
  overflow: hidden !important;
}

body {
  margin: 0;
  font-family: Roboto, RobotoDraft, Arial, sans-serif;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
