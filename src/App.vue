<template>
  <v-app id="app">
    <v-container fluid fill-height>
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
  overflow: hidden;
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

.el-tooltip__popper.is-light {
  border-color: #e6e6e6;
}

.el-tooltip__popper.is-light[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: #e6e6e6;
}
</style>
