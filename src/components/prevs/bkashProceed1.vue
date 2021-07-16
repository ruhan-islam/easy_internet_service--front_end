<template>
  <div class="container" style="margin: 0px">
    <div>
      <img src="../assets/bkashP.png" alt="bkash payment" />
    </div>
    <div class="div1" style="margin: 0px">
      <div class="row">
        <div class="col-lg-6" style="color: white">
          <h6>Package : {{ pkgB }} Mbps Unlimited</h6>
          <v-divider class="mx-3"></v-divider>
          <h6>Monthly Bill : {{ pkgP }} (BDT)</h6>
          <v-divider class="mx-3"></v-divider>
          <h6 style="margin-bottom:200px">Payable Amount : {{ pkgP }} (BDT)</h6>

          <v-btn
            color="error"
            @click="proceeeed"
          >
            Pay with bKash
          </v-btn>
        </div>
        <div class="col-lg-6">
          <v-timeline :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item color="purple lighten-2" fill-dot right>
              <v-card>
                <v-card-title class="purple lighten-2">
                  <h6 class="white--text font-weight-light">
                    Click on pay with bKash
                  </h6>
                </v-card-title>
              </v-card>
            </v-timeline-item>

            <v-timeline-item color="amber lighten-1" fill-dot left small>
              <v-card>
                <v-card-title class="amber lighten-1 justify-end">
                  <h6 class="mr-4 white--text font-weight-light">
                    Enter Your bkash Account
                  </h6>
                </v-card-title>
              </v-card>
            </v-timeline-item>

            <v-timeline-item color="cyan lighten-1" fill-dot right>
              <v-card>
                <v-card-title class="cyan lighten-1">
                  <h6 class="white--text font-weight-light">
                    Check your Mobile Meassage and Entry The OTP
                  </h6>
                </v-card-title>
              </v-card>
            </v-timeline-item>

            <v-timeline-item color="red lighten-1" fill-dot left small>
              <v-card>
                <v-card-title class="red lighten-1 justify-end">
                  <h6 class="mr-4 white--text font-weight-light">
                    Entry Your PIN and Confirm
                  </h6>
                </v-card-title>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </div>
      </div>
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
      (v) => !!v || "card number is required",
      (v) => /^\d{11}$/.test(v) || "card number must be valid",
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
      this.$router.push("bkashProceed");
    },

    changeData() {
      this.rData = "Resent.";
    },
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
  padding: 20px 20px;
  background-color: rgb(196, 8, 124);
}
</style>