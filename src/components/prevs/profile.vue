<template>
  <div>
    <headerr></headerr>

    <div class="container">
      <b> Personal info </b> <br>
      name: {{name}} <br>
      email: KS@gmail.com <br>
      address: Azimpur, Dhaka <br>
    </div>

    <div v-show="!show" class="container">
      <b> Package info </b> <br>
      name: {{pkg.name}} <br>
      price: {{pkg.price}} Tk <br>
      bandwidth: {{pkg.bandwidth}} GBPS <br>
      duration: {{pkg.duration}} months <br>
      subscription end: July 06, 2022
    </div>

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
      <br />
    </div>

    <div class="container">

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
      name: "",
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
    ...mapGetters(["getSelectedPackage", "getIsPaid", "getUserName"]),
  },
  mounted() {
    this.pkg = this.getSelectedPackage;
    if (this.pkg != "") {
      this.show = false;
    }
    this.name = this.getUserName;
    // console.log(this.pkg);
  },
};
</script>
