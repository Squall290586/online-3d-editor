<template>
  <div class="sign-in-out">
    <el-tooltip placement="bottom-end" effect="light">
      <div slot="content" :style="(!user) ? '' : 'width: 350px; ' + 'max-width: 85vw; font-size: 13px;'">
        <template v-if="!!user">
          <el-row>
            <el-col :span="8">
              <a target="_blank" href="https://myaccount.google.com/" style="width: 100px; height: 100px;">
                <img :src="user.photoURL" style="width: 100px; height: 100px; border-radius: 100%;"/>
              </a>
            </el-col>
            <el-col :span="16">
              <div style="font-weight: bold">
                {{user.displayName}}
              </div>
              <div>
                {{user.email}}
              </div>
              <div style="padding-top: 10px;">
                <a target="_blank" href="https://plus.google.com">Profil Google+</a>
                &nbsp;-&nbsp;
                <a target="_blank" href="https://myaccount.google.com/privacypolicy">Confidentialité</a>
              </div>
            </el-col>
          </el-row>
          <el-row style="padding-top: 20px;"/>
        </template>
        <el-row>
          <el-col :span="12" v-show="!!user" style="text-align: left;">
            <el-button v-on:click="signIn()" plain>
              Ajouter un compte
            </el-button>
          </el-col>
          <el-col :span="(!user) ? 24 : 12" style="text-align: right;">
            <el-button v-on:click="(!user) ? signIn() : signOut()" plain>
              {{(!user) ? "Connection" : "Déconnection"}}
            </el-button>
          </el-col>
        </el-row>
      </div>
      <el-button type="primary" circle>
        <font-awesome-icon v-if="!user" icon="sign-in-alt"/>
        <img v-else :src="user.photoURL"/>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
import firebase from "firebase";

// UI
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSignInAlt, faSignOutAlt);

export default {
  name: "SignInOut",
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      token: null
    };
  },
  mounted() {
    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        if (result.user) {
          this.$router.push("/");
        }
      });
  },
  computed: {
    user() {
      return firebase.auth().currentUser;
    }
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(
          result => {
            this.$router.go("/");
          },
          error => {
            alert(error.message);
          }
        );
    },
    signIn() {
      firebase
        .auth()
        .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  }
};
</script>

<style scoped>
.sign-in-out {
  z-index: 100;
  position: absolute;
  right: 2vw;
  top: 2vh;
}

.sign-in-out .el-button {
  border: 0;
  padding: 0;
  font-size: 3.5vh;
  height: 7vh;
  width: 7vh;
}

.sign-in-out .el-button img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
</style>
