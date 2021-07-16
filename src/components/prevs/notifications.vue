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
  </div>
</template>

<script>
import headerr from "./header.vue";
import { mapGetters } from "vuex";

export default {
  components: { headerr },
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
      this.$router.push("payMethods");
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
