<template>
  <div>
    <topbar></topbar>

    <div class="container">
      <div v-show="show">
        <!-- <v-row align="center" justify="space-around">
          No package has been selected yet <br />
          <br />
          <br />
        </v-row>
        <v-row align="center" justify="space-around">
          <v-btn depressed color="primary" @click="goToPkg">
            Get Started
          </v-btn>
        </v-row> -->
      </div>
      <div v-show="!show">
        <!-- <card
          :name="pkg.name"
          :price="pkg.price"
          :bandwidth="pkg.bandwidth"
          :duration="pkg.duration"
        >
        </card>
        <v-row v-if="!this.getIsPaid" align="center" justify="space-around">
          <v-btn depressed color="primary" @click="gotoPayMethods">
            Pay Now
          </v-btn>
        </v-row>
        <v-row v-if="this.getIsPaid" align="center" justify="space-around">
          <v-btn depressed color="primary" @click="gotoPayMethods">
            Extend duration
          </v-btn>
          <v-btn depressed color="primary" @click="gotoPayMethods">
            Change Package
          </v-btn>
        </v-row>
        <br />
        <br />
        <br /> -->
      </div>
    </div>

    <bottombar></bottombar>
  </div>
</template>

<script>
import topbar from "./topbar.vue";
import bottombar from "./bottombar.vue";
import { mapGetters } from "vuex";

export default {
  components: { topbar, bottombar },
  data() {
    return {
      pkg: "",
      show: true,
      ispInfo: {
        name: "KS",
        password: "123abc",
        curr_pkg: "",
        liscense_id: "121ABCd3",
        connection_status: "false",
        tokens: { access: "entry", token: "Boom" },
      },
    };
  },
  methods: {
    goToPkg() {
      this.$router.push("packages");
    },
    gotoPayMethods() {
      this.$router.push("paymentOptions");
    },
  },
  computed: {
    ...mapGetters(["getSelectedPackage", "getIsPaid"]),
  },
  mounted() {
    this.pkg = this.getSelectedPackage;
    if (this.pkg != "") {
      this.show = false;
    }
    // console.log(this.pkg);
  },
};
</script>
