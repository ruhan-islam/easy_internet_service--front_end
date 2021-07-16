<template>
  <div style="background-color: #e6ddc6">
    <div class="div1">
      <img src="../assets/bkashP.png" alt="bkash payment" />

      <v-divider class="mx-3"></v-divider>
      <v-divider class="mx-3"></v-divider>

      <h4>Amader Internet</h4>
      <span>Total amount: {{ pkgP }} BDT</span>
      
    </div>
    <div class="div2">
        <span style="color:white">Enter the verification code [OTP]</span>
        <v-form ref="form" v-model="valid" lazy-validation>
      
          <v-text-field
            type="password"
            v-model="cardnumber"
            :rules="numberRules"
            label="PIN"
            required
          ></v-text-field>
        </v-form>
        <v-btn
            :disabled="cardnumber === '' || cardnumber.length!=5"
            color="error"
            @click="proceeeed"
          >
            Next
          </v-btn>
    </div>
  </div>
</template>



<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    valid: false,
    pkgN: "",
    pkgP: "",
    pkgB: "",
    pkgD: "",
    date: "",
    cardnumber: "",
    rData: "Resend one time password.",

    numberRules: [
      (v) => !!v || "PIN is required",
      (v) => /^\d{5}$/.test(v) || "PIN must be valid",
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
  margin: 150px 500px 0px;
  border-style: groove;
  padding: 20px 20px;
  background-color: rgb(196, 8, 124);
}
.div2 {
  margin: 0px 500px;
  border-style: groove;
  padding: 20px 20px;
  background-color: #fff;
}
</style>