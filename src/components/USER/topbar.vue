<template>
  <div>
    <v-bottom-navigation horizontal color="teal" grow dark>
      <!-- <v-btn router-link to="/NTTN" exact>
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn> -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" router-link to="/NTTN/home" exact>
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
          <v-btn v-bind="attrs" v-on="on" router-link to="/NTTN/packages" exact>
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
          <v-btn v-bind="attrs" v-on="on" router-link to="/NTTN/payments" exact>
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
            to="/NTTN/notifications"
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
          <v-btn
            v-bind="attrs"
            v-on="on"
            router-link
            to="/NTTN/dashboard"
            exact
          >
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
  </div>
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
    this.intervalID = setInterval(this.myCallback, 5000);
  },

  computed: {
    ...mapGetters([
      "isLoggedIn",
      "getAuthToken",
      "getNtfCount",
      "getUserName",
      "getUserType",
    ]),
  },

  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push("login");
    } else if (this.getUserType !== "NTTN") {
      this.$router.go(-1);
    }
  },

  methods: {
    ...mapMutations([
      "setLoggedOut",
      "resetAuthToken",
      "setNtfCount",
      "resetUserName",
      "resetUserType",
    ]),

    myCallback() {
      axios
        .post("/api/notification/unseenNotificationCount", {
          receiverID: "Nttn",
          receiverType: 1, // for NTTN
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            // console.log(res.data.unseenCount);
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
        .post("/api/nttn/logout", {
          token: this.getAuthToken,
        })
        .then((res) => {
          //console.log(res);
          if (res.status == 200) {
            clearInterval(this.intervalID);
            this.setNtfCount(0);
            this.resetUserName;
            this.resetUserType;
            this.resetAuthToken;
            this.setLoggedOut;
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
