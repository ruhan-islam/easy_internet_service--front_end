<template>
  <div style="text-align:center">
    <headerr></headerr>
    <div class="container row" style="border-style:outset">
      <div class="container col-lg-8">
        <div class="container" style="margin-bottom:50px">
          Pay BDT {{ pkgP }} with Debit / Credit Cards ( Local / International )
          <v-divider class="mx-4"></v-divider>
          <button class="spanStyle" @click="paymentVisa">Pay with <img src="../assets/visa.png" alt="VISA"></button>
          <button class="spanStyle" @click="paymentVisa">Pay with <img src="../assets/master.png" alt="Master"></button>
        </div>
        <div class="container" style="margin-bottom:50px">
          Pay BDT {{ pkgP }} with Mobile Banking
          <v-divider class="mx-4"></v-divider>
          <button class="spanStyle" @click="paymentRocket">Pay with <img src="../assets/rocket.png" alt="rocket"></button>
          <button class="spanStyle" @click="paymentBkash">Pay with <img src="../assets/bkash.png" alt="bkash"></button>
          <button class="spanStyle" @click="paymentNagad">Pay with <img src="../assets/nagad.png" alt="nagad"></button>
        </div>
      </div>
      <div class="container col-lg-4 div2">
          <h4 style="text-align:center;padding:10px">Payment Summary</h4>
          <p>Invoice To  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;   {{ name }} </p>
          <v-divider class="mx-4"></v-divider>
          <p>Invoice Amount  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  {{ pkgP }}</p>
          <v-divider class="mx-4"></v-divider>
          <p>Total  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp; {{ pkgP }}</p>
      </div>

    </div>
    
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import headerr from "./header.vue";

export default {
  components: { headerr},
  data: () => ({
    loading: false,
    selection: 1,
    pkgN: "",
    pkgP: "",
    pkgB: "",
    pkgD: "",
    name: "",
    ...mapGetters([
      "getSelPkgName",
      "getSelPkgPrice",
      "getSelPkgBand",
      "getSelPkgDur",
      "getUserName",
    ]),
  }),

  // computed: {
  //   ...mapGetters([
  //     "getSelPkgName",
  //     "getSelPkgPrice",
  //     "getSelPkgBand",
  //     "getSelPkgDur",
  //     "getUserName",
  //   ]),
  // },

  methods: {
    // reserve() {
    //   this.loading = true;
    //   setTimeout(() => (this.loading = false), 2000);
    // },

    paymentVisa() {
      this.$router.push("paymentOptionsbyVisa");
    },

    paymentRocket() {
      this.$router.push("paymentOptionsbyVisa");
    },

    paymentBkash() {
      this.$router.push("paymentOptionsbyBkash");
    },

    paymentNagad() {
      this.$router.push("paymentOptionsbyVisa");
    }
  },

  mounted() {
    this.pkgN = this.getSelPkgName();
    this.pkgP = this.getSelPkgPrice();
    this.pkgB = this.getSelPkgBand();
    this.pkgD = this.getSelPkgDur();
    this.name = this.getUserName();

    //console.log(this.name);
  }
};

</script>


<style scoped>
  .centerkoro
  {
    padding-top: 50px;
    text-align:center;
    }

    .div2{
        background: rgb(96, 118, 243);
        height: 500px;
        color: #fff;
        }

    .spanStyle{
        padding: 5px;
        border-style:ridge;
        margin: 7px 50px 100px;

    }

    .spanStyle:hover{
      background-color:cornflowerblue;
    }
    
</style>
