<template>
  <div style="background-color: #e6ddc6">
    <div class="div1">
      <div class="row">
        <div class="col-lg-6">
          <img src="../assets/visaName.png" alt="VISA" />
        </div>
        <div class="col-lg-6">
          <img src="../assets/sonali.png" alt="Sonali Bank" />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <h6>Merchant</h6>
        </div>
        <div class="col-lg-6">Amader Internet</div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <h6>Amount</h6>
        </div>
        <div class="col-lg-6">BDT {{ pkgP }}</div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <h6>Date</h6>
        </div>
        <div class="col-lg-6">
          07/07/2021
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <h6>Card Number</h6>
        </div>
        <div class="col-lg-6">************8136</div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <h6>Address</h6>
        </div>
        <div class="col-lg-6">88********506</div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <h6 style="margin-top: 20px">Dynamic Password</h6>
        </div>
        <div class="col-lg-6">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="cardnumber"
              :rules="numberRules"
              label="Password"
              required
            ></v-text-field>
            <u @click="changeData" style="text-style:underline"> {{ rData }}</u>
          </v-form>
        </div>
      </div>

      <v-btn :disabled="cardnumber === '' || cardnumber.length!=6" color="success" @click="proceeeed">
        Confirm
      </v-btn>
    </div>
  </div>
</template>



<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    ...mapMutations(["setIsPaid",]),
    valid: false,
    pkgN: "",
    pkgP: "",
    pkgB: "",
    pkgD: "",
    date: "",
    cardnumber: "",
    rData: "Resend one time password.",

    numberRules: [
      (v) => !!v || "password is required",
      (v) => /^\d{6}$/.test(v) || "password must be valid",
    ],
  }),

  computed: {
    ...mapGetters([
      "getSelPkgName",
      "getSelPkgPrice",
      "getSelPkgBand",
      "getSelPkgDur",
    ]),
  },

  methods: {
    proceeeed() {
      alert("Transaction is successful.");
      this.setIsPaid(true);
      this.$router.push("profile");
    },
    changeData(){
        this.rData="Resent."
    }
  },
  mounted() {
    this.valid = false;
    this.pkgN = this.getSelPkgName;
    this.pkgP = this.getSelPkgPrice;
    this.pkgB = this.getSelPkgBand;
    this.pkgD = this.getSelPkgDur;
    this.date = new Date().getTime();
  },
  created() {
    this.show = true;
  },
};
</script>


<style scoped>
.div1 {
  margin: 150px 500px;
  border-style: groove;
  padding: 20px 20px;
  background-color: #fff;
}
</style>