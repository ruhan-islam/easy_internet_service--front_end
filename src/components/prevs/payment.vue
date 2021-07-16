<template>
  <div>
    <headerr></headerr>
    <div v-show="show">
      <v-row align="center" justify="space-around">
        No package has been selected yet <br />
        <br />
        <br />
      </v-row>
      <v-row align="center" justify="space-around">
        <v-btn depressed color="primary" @click="goToPkg">
          Get Started
        </v-btn>
      </v-row>
    </div>
    <div v-show="!show">
      <card
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
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import card from "./simpleCard.vue";
import headerr from "./header.vue";
import { mapGetters } from "vuex";

export default {
  components: { headerr, card },
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
