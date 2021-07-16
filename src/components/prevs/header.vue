<template>
  <div class="container">
    <v-bottom-navigation :background-color="color" dark shift>
      <v-btn router-link to="/" exact>
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn router-link to="/packages" exact>
        <span>Packages</span>
        <v-icon>mdi-package-variant</v-icon>
      </v-btn>

    

     <v-btn router-link to="/payment" exact>
        <span>Payment</span>
        <v-icon>mdi-credit-card</v-icon>
      </v-btn>

      <v-btn router-link to="/notifications" exact>
        <span>Notifications</span>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn router-link to="/profile" exact>
        <span>Profile</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn router-link @click="logOut" exact>
        <span>Signout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";

export default {
  // data: () => ({ value: -1 }),

  computed: {
    ...mapGetters(["isLoggedIn", "getAuthToken"]),
    ...mapMutations(["setLoggedIn", "setLoggedOut", "resetAuthToken"]),

    color() {
      switch (this.value) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        case 4:
          return "purple";
        case 5:
          return "crimson";
        case -1:
          return "white";
        default:
          return "crimson";
      }
    },
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push("login");
    }
  },
  methods : {
    logOut() {
      axios
        .post("/api/isp/logout", {
          "token": this.getAuthToken,})
        .then((res) => {
            //console.log(res);
            if (res.status == 200) {
              this.setLoggedOut;
              this.resetAuthToken;
              this.$router.push("/login");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  text-align: center;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #fff;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 10px;
}
.container{
  padding: 14px 0;
  margin-bottom: 40px;
}
.router-link-active {
  background: #eee;
  color: #444;
}
</style>
