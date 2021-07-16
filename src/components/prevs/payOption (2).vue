<template>
  <div style="text-align:center">
    <headerr></headerr>
    <div class="container row" style="border-style:outset">
      <div class="col-lg-8">
        <div style="margin-bottom:50px">
          Pay BDT {{ pkgP }} with Debit / Credit Cards ( Local / International )
          <v-divider class="mx-4"></v-divider>
          <span class="spanStyle" @click="paymentVisa">Pay with <img src="../assets/visa.png" alt="VISA"></span>
          <span class="spanStyle" @click="paymentVisa">Pay with <img src="../assets/master.png" alt="Master"></span>
        </div>
          <div style="margin-bottom:50px">
              Pay with Mobile Banking
          <v-divider class="mx-4"></v-divider>
          <span class="spanStyle" @click="paymentRocket">Pay with <img src="../assets/rocket.png" alt="rocket"></span>
          <span class="spanStyle" @click="paymentBkash">Pay with <img src="../assets/bkash.png" alt="bkash"></span>
          <span class="spanStyle" @click="paymentNagad">Pay with <img src="../assets/nagad.png" alt="nagad"></span>
          </div>
          
      </div>
      <div class="col-lg-4 div2">
          <h4 style="text-align:center;padding:10px">Payment Summary</h4>
          <p>Invoice To  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;   Karim</p>
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
    desserts: [
          
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
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },

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
    this.pkgN = this.getSelPkgName;
    this.pkgP = this.getSelPkgPrice;
    this.pkgB = this.getSelPkgBand;
    this.pkgD = this.getSelPkgDur;
    this.desserts=[
          {
            name: 'PACKAGE NAME',
            calories: this.getSelPkgName,
          },
          {
            name: 'BANDWIDTH',
            calories: this.getSelPkgBand,
          },
          {
            name: 'PRICE',
            calories: 'TK.'+ this.getSelPkgPrice + '/User',
          },
          {
            name: 'DATA LIMIT',
            calories: 'Unlimited',
          },
          {
            name: 'IP TYPE',
            calories: 'Dynamic Public/Real IP',
          },
          {
            name: 'YOUTUBE',
            calories: 'Buffer Less',
          },
          {
            name: 'COVERAGE AREA',
            calories: 'Nation Wide',
          },
          ]
  },
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
