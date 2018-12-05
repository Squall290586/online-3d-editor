<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4 v-if="!loading">
      <h1>Merci de vous connecter pour accéder à l'éditeur</h1>
      <br>
      <v-btn large @click="signIn">Connexion</v-btn>
    </v-flex>
    <div class="cube-grid" v-if="loading">
      <div class="cube cube1"></div>
      <div class="cube cube2"></div>
      <div class="cube cube3"></div>
      <div class="cube cube4"></div>
      <div class="cube cube5"></div>
      <div class="cube cube6"></div>
      <div class="cube cube7"></div>
      <div class="cube cube8"></div>
      <div class="cube cube9"></div>
    </div>
  </v-layout>
</template>

<script>
import Firebase from "firebase";

export default {
  name: "SignIn",
  data() {
    return {
      loading: true
    };
  },
  created() {
    this.loading = false;
  },
  methods: {
    signIn() {
      Firebase.auth()
        .signInWithPopup(new Firebase.auth.GoogleAuthProvider())
        .then(() => {
          this.$router.replace("editor");
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    }
  }
};
</script>

<style scoped>
.cube-grid {
  width: 100px;
  height: 100px;
  margin: 100px auto;
}

.cube-grid .cube {
  width: 33%;
  height: 33%;
  background-color: #333;
  float: left;
  -webkit-animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
  -moz-animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
  -o-animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
}

.cube-grid .cube1 {
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.cube-grid .cube2 {
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  -o-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.cube-grid .cube3 {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  -o-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.cube-grid .cube4 {
  -webkit-animation-delay: 0.1s;
  -moz-animation-delay: 0.1s;
  -o-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.cube-grid .cube5 {
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.cube-grid .cube6 {
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  -o-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.cube-grid .cube7 {
  -webkit-animation-delay: 0s;
  -moz-animation-delay: 0s;
  -o-animation-delay: 0s;
  animation-delay: 0s;
}

.cube-grid .cube8 {
  -webkit-animation-delay: 0.1s;
  -moz-animation-delay: 0.1s;
  -o-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.cube-grid .cube9 {
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    -moz-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    -o-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3d(0, 0, 1);
    -moz-transform: scale3d(0, 0, 1);
    -ms-transform: scale3d(0, 0, 1);
    -o-transform: scale3d(0, 0, 1);
    transform: scale3d(0, 0, 1);
  }
}

@keyframes cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    -moz-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    -o-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3d(0, 0, 1);
    -moz-transform: scale3d(0, 0, 1);
    -ms-transform: scale3d(0, 0, 1);
    -o-transform: scale3d(0, 0, 1);
    transform: scale3d(0, 0, 1);
  }
}
</style>
