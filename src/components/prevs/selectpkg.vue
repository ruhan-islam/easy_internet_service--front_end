<template>
  <div>
    <headerr></headerr>
    <div class="container">
      <h1>PACKAGE OVERVIEW</h1>
      <v-simple-table dark>
        <template v-slot:default>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <div class="centerkoro">
      <v-btn class="mx-1" color="error" @click="doPayment"> Get Now </v-btn>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from "vuex";
import headerr from "./header.vue";

export default {
  components: { headerr},
  data: () => ({
    ...mapMutations(["setSelectedPackage",]),
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
    ...mapGetters(["getSelPkgName", "getSelPkgPrice", "getSelPkgBand", "getSelPkgDur",]),
  },
  methods: {
    // reserve() {
    //   this.loading = true;
    //   setTimeout(() => (this.loading = false), 2000);
    // },

    doPayment() {
      // console.log("here");
      this.setSelectedPackage({
        name: this.pkgN,
        package_type: 0,
        duration: this.pkgD, 
        price: this.pkgP, 
        bandwidth: this.pkgB});
      this.$router.push("paymentOptions");
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
    ];

    // console.log(this.pkgP);
  },
};
</script>


<style scoped>
  .centerkoro {
    padding-top: 50px;
    text-align:center;
  }
</style>