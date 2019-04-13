<template>
  <v-layout column pa-3>
    <v-icon class="unselectable">zoom_in</v-icon>
    <vue-slider v-bind="options" v-model="value" @change="$emit('zoom', $event)" class="py-3"></vue-slider>
    <v-icon class="unselectable">zoom_out</v-icon>
  </v-layout>
</template>

<script>
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/default.css'

  export default {
    name: "Slider",
    components: {
      VueSlider
    },
    props: [
      "init"
    ],
    data () {
      return {
        value: this.init,
        options: {
          direction: "ttb",
          height: 200,
          dotSize: 30,
          interval: 10,
          min: 10,
          max: 100,
          tooltip: 'none'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .unselectable {
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }
</style>
