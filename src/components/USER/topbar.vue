<template>
  <div>
    <v-bottom-navigation horizontal color="teal" grow dark>
      <!-- <v-btn router-link to="/USER" exact>
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn> -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" router-link to="/USER/home" exact>
            <span> Home </span>
            <v-icon> mdi-home </v-icon>
          </v-btn>
        </template>
        <span> Home </span>
      </v-tooltip>

      <!-- <v-btn router-link to="/USER/packages" exact>
        <span>Packages</span>
        <v-icon>mdi-package-variant</v-icon>
      </v-btn> -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" router-link to="/USER/packages" exact>
            <span> Packages </span>
            <v-icon> mdi-package-variant </v-icon>
          </v-btn>
        </template>
        <span> Packages </span>
      </v-tooltip>

      <!-- <v-btn router-link to="/USER/payments" exact>
        <span>Payments</span>
        <v-icon>mdi-credit-card</v-icon>
      </v-btn> -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" router-link to="/USER/payments" exact>
            <span> Payments </span>
            <v-icon> mdi-credit-card </v-icon>
          </v-btn>
        </template>
        <span> Payments </span>
      </v-tooltip>

      <!-- <v-btn router-link to="/USER/notifications" exact>
        <span>Notifications</span>
        <v-icon>mdi-bell</v-icon>
      </v-btn> -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            router-link
            to="/USER/notifications"
            exact
          >
            <span> Notifications </span>
            <v-icon> mdi-bell </v-icon>
            <v-badge v-if="getNtfCount !== 0" :content="getNtfCount"> </v-badge>
          </v-btn>
        </template>
        <span> Notifications </span>
      </v-tooltip>

      <!-- <v-btn router-link to="/USER/profile" exact>
        <span>Profile</span>
        <v-icon>mdi-account</v-icon>
      </v-btn> -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            router-link
            to="/USER/dashboard"
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
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      intervalID: "",
    };
  },

  created() {
    // if (!this.getLoginState) {
    //   this.$router.push("/");
    // } else
    if (this.getUserType !== "USER") {
      this.$router.go(-1);
    }
    this.myCallback();
    this.intervalID = setInterval(this.myCallback, 5000);
  },

  computed: {
    ...mapGetters([
      "getLoginState",
      "getAuthToken",
      "getNtfCount",
      "getUserName",
      "getUserType",
    ]),
  },

  methods: {
    ...mapMutations([
      "setLoginState",
      "setAuthToken",
      "setNtfCount",
      "setUserName",
      "setUserType",
    ]),

    myCallback() {
      axios
        .post("/api/notification/unseenNotificationCount", {
          receiverID: this.getUserName,
          receiverType: 3, // for USER
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
        .post("/api/user/logout", {
          token: this.getAuthToken,
        })
        .then((res) => {
          //console.log(res);
          if (res.status == 200) {
            clearInterval(this.intervalID);
            this.setLoginState(false);
            this.setNtfCount(0);
            this.setUserName("");
            this.setUserType("");
            this.setAuthToken("");
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
