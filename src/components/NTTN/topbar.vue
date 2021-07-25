<template>
  <div>
    <v-bottom-navigation color="teal" grow dark>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrsHome }">
          <v-btn v-bind="attrsHome" v-on="on" router-link to="/NTTN/home" exact>
            <span> Home </span>
            <v-icon> mdi-home </v-icon>
          </v-btn>
        </template>
        <span> Home </span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrsPackages }">
          <v-btn
            v-bind="attrsPackages"
            v-on="on"
            router-link
            to="/NTTN/packages"
            exact
          >
            <span> Packages </span>
            <v-icon> mdi-package-variant </v-icon>
          </v-btn>
        </template>
        <span> Packages </span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrsOffer }">
          <v-btn
            v-bind="attrsOffer"
            v-on="on"
            router-link
            to="/NTTN/offers"
            exact
          >
            <span> Offers </span>
            <v-icon> mdi-widgets </v-icon>
          </v-btn>
        </template>
        <span> Offer </span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrsPayments }">
          <v-btn
            v-bind="attrsPayments"
            v-on="on"
            router-link
            to="/NTTN/payments"
            exact
          >
            <span> Payments </span>
            <v-icon> mdi-credit-card </v-icon>
          </v-btn>
        </template>
        <span> Payments </span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrsNotifications }">
          <v-btn
            v-bind="attrsNotifications"
            v-on="on"
            router-link
            to="/NTTN/notifications"
            exact
          >
            <span> Notifications </span>
            <v-icon> mdi-bell </v-icon>
            <v-badge
              offset-x="-5"
              offset-y="15"
              v-if="getNtfCount !== 0"
              :content="getNtfCount"
            >
            </v-badge>
          </v-btn>
        </template>
        <span> Notifications </span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrsNotify }">
          <v-btn
            v-bind="attrsNotify"
            v-on="on"
            router-link
            to="/NTTN/notify"
            exact
          >
            <span> Notify </span>
            <v-icon> mdi-widgets </v-icon>
          </v-btn>
        </template>
        <span> Notify </span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrsTickets }">
          <v-btn
            v-bind="attrsTickets"
            v-on="on"
            router-link
            to="/NTTN/tickets"
            exact
          >
            <span> Tickets </span>
            <v-icon> mdi-widgets </v-icon>
          </v-btn>
        </template>
        <span> Tickets </span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrsDashboard }">
          <v-btn
            v-bind="attrsDashboard"
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

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrsLogout }">
          <v-btn v-bind="attrsLogout" v-on="on" @click="logOut()">
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
    if (this.getUserType !== "NTTN") {
      this.$router.go(-1);
    }
    this.fetchNotificationCount();
    this.intervalID = setInterval(this.fetchNotificationCount, 2000);
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
      "setUserName",
      "setUserType",
      "setLoginState",
      "setAuthToken",
      "setNtfCount",
    ]),

    fetchNotificationCount() {
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
