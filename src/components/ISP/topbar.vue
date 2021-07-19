<template>
  <v-bottom-navigation horizontal color="teal" grow dark>
    <!-- <v-btn router-link to="/NTTN" exact>
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn> -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" router-link to="/ISP/home" exact>
          <span> Home </span>
          <v-icon> mdi-home </v-icon>
        </v-btn>
      </template>
      <span> Home </span>
    </v-tooltip>

    <!-- <v-btn router-link to="/NTTN/packages" exact>
        <span>Packages</span>
        <v-icon>mdi-package-variant</v-icon>
      </v-btn> -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" router-link to="/ISP/packages" exact>
          <span> Packages </span>
          <v-icon> mdi-package-variant </v-icon>
        </v-btn>
      </template>
      <span> Packages </span>
    </v-tooltip>

    <!-- <v-btn router-link to="/NTTN/payments" exact>
        <span>Payments</span>
        <v-icon>mdi-credit-card</v-icon>
      </v-btn> -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" router-link to="/ISP/payments" exact>
          <span> Payments </span>
          <v-icon> mdi-credit-card </v-icon>
        </v-btn>
      </template>
      <span> Payments </span>
    </v-tooltip>

    <!-- <v-btn router-link to="/NTTN/notifications" exact>
        <span>Notifications</span>
        <v-icon>mdi-bell</v-icon>
      </v-btn> -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          router-link
          to="/ISP/notifications"
          exact
        >
          <span> Notifications </span>
          <v-icon> mdi-bell </v-icon>
          <v-badge v-if="getNtfCount !== 0" :content="getNtfCount"> </v-badge>
        </v-btn>
      </template>
      <span> Notifications </span>
    </v-tooltip>

    <!-- <v-btn router-link to="/NTTN/profile" exact>
        <span>Profile</span>
        <v-icon>mdi-account</v-icon>
      </v-btn> -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" router-link to="/ISP/dashboard" exact>
          <span> Dashboard </span>
          <v-icon> mdi-widgets </v-icon>
        </v-btn>
      </template>
      <span> Dashboard </span>
    </v-tooltip>

    <!-- <v-btn router-link @click="logOut" exact>
        <span>Signout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn> -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" @click="logOut()">
          <span> Signout </span>
          <v-icon> mdi-logout </v-icon>
        </v-btn>
      </template>
      <span> Signout </span>
    </v-tooltip>
  </v-bottom-navigation>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      intervalID: "",
    };
  },

  created() {
    this.myCallback();
    setInterval(this.myCallback, 5000);
  },

  computed: {
    ...mapGetters(["isLoggedIn", "getAuthToken", "getNtfCount", "getUserName"]),
  },

  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push("login");
    }
  },

  methods: {
    ...mapMutations(["setLoggedOut", "resetAuthToken", "setNtfCount"]),

    myCallback() {
      axios
        .post("/api/notification/unseenNotificationCount", {
          receiverID: this.getUserName,
          receiverType: 2, // for ISP
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.setNtfCount(res.data.unseenCount);
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    logOut() {
      axios
        .post("/api/isp/logout", {
          token: this.getAuthToken,
        })
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
    },
  },
};
</script>
