<template>
  <div class="container">
    <v-form ref="form" v-model="valid" lazy-validation class="div1">
      <div class="row">
        <div class="col-lg-6">
          <v-text-field
            v-model="cardnumber"
            :rules="numberRules"
            label="CARD NUMBER"
            required
          ></v-text-field>
        </div>

        <div class="col-lg-6">
          <v-text-field
            v-model="month"
            :rules="monthRules"
            label="Month/Year"
            required
          ></v-text-field>
        </div>

        <div class="col-lg-6">
          <v-text-field
            v-model="holder"
            label="CARD HOLDER"
            required
          ></v-text-field>
        </div>

        <div class="col-lg-6">
          <v-text-field
            type="password"
            v-model="cvc"
            :rules="cvcRules"
            label="CVV2(CVC2)"
            required
          ></v-text-field>
        </div>
      </div>

      <v-btn
        :disabled="!valid || month === '' || cardnumber === '' || holder === '' || cvc === ''"
        color="success"
        @click="proceeeed"
      >
        Proceed
      </v-btn>
    </v-form>
  </div>
</template>


<script>
import { mapGetters, } from "vuex";
export default {
  data: () => ({
    valid: false,
    holder: "",
    cvc: "",
    month: "",
    cardnumber: "",
    pkgN: "",
    pkgP: "",
    pkgB: "",
    pkgD: "",

    numberRules: [
      (v) => !!v || "card number is required",
      (v) => /^\d{16}$/.test(v) || 'card number must be valid',
      
    ],

    monthRules: [
      (v) => !!v || "month/year is required",
      (v) => /^\d{2}\/\d{2}$/.test(v) || 'must be given in format month/year',
      
    ],

    cvcRules: [
      (v) => !!v || "cvv/cvc is required",
      (v) => /^\d{3}$/.test(v) || 'cvv/cvc must be valid',
      
    ],

  }),

  computed: {
    ...mapGetters(["getSelPkgName", "getSelPkgPrice", "getSelPkgBand", "getSelPkgDur",]),
  },

  methods: {
      proceeeed() {
        //console.log("done");
        this.$router.push("visaProceed");
      }
  },
  mounted() {
    this.valid = false;
    this.pkgN = this.getSelPkgName;
    this.pkgP = this.getSelPkgPrice;
    this.pkgB = this.getSelPkgBand;
    this.pkgD = this.getSelPkgDur;
  },
  created() {
    this.show = true;
  },

};
</script>

<style scoped>
.div1 {
  margin: 100px 300px;
  border-style: groove;
  padding: 20px 20px;
}
</style>
