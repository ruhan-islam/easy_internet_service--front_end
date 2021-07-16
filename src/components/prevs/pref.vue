<template>
  <div class="outerdiv">
    <div class="navContainer">
      <headerr></headerr>

      <div class="container">
        <div class="row filterDiv">
          <div class="col-lg-3">
            <v-range-slider
              v-model="price"
              label="Price (Taka)"
              min="10000"
              max="500000"
              step="1000"
            >
            </v-range-slider>
            <label for="">{{ price }}</label>
          </div>
          <div class="col-lg-3">
            <v-range-slider
              v-model="bandwidth"
              label="Bandwidth (GBPS)"
              min="1"
              max="100"
              step="1"
            >
            </v-range-slider>
            <label for="">{{ bandwidth }}</label>
          </div>

          <div class="col-lg-3">
            <v-range-slider
              v-model="duration"
              label="Duration (Months)"
              min="1"
              max="24"
              step="1"
            >
            </v-range-slider>
            <label for="">{{ duration }}</label>
          </div>
          <div class="col-lg-3">
            <v-btn depressed color="primary" @click="filter">
              Filter
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <v-container>
      <div class="container">
        <div class="row">
          <div class="col-lg-4" v-for="(pkg, i) in pkgs" :key="i">
            <card
              :name="pkg.name"
              :price="pkg.price"
              :bandwidth="pkg.bandwidth"
              :duration="pkg.duration"
              @addedtocompare="comparefunc($event)"
            >
            </card>
          </div>
        </div>
      </div>

      <v-row v-show="show" justify="space-around">
        <div>
          <v-badge :content="messages" :value="messages" color="green" overlap>
            <v-btn class="mx-1" color="primary" @click="comparePackage">
              Compare
            </v-btn>
            <!-- <v-icon large>
            mdi-vuetify
          </v-icon> -->
          </v-badge>

          <v-btn class="mx-2" color="error" @click="clearComps">
            Clear
          </v-btn>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import card from "./card.vue";
import { mapMutations } from "vuex";
import headerr from "./header.vue";
//import {eventBus} from "../main";

export default {
  components: { card, headerr },
  data() {
    return {
      allPkgs: [],
      pkgs: [],
      price: [10000, 500000],
      bandwidth: [1, 100],
      duration: [1, 24],
      pkg: "",
      comparePkg: [],
      messages: 0,
      show: false,
    };
  },

  created() {
    this.show = true;
    axios
      .get("/api/package/fetch")
      .then((res) => {
        this.allPkgs = res.data.data;
        this.pkgs = this.allPkgs;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  computed: {},

  watch: {},

  methods: {
    ...mapMutations(["setSelectedPackage", "setComparedPkgs"]),

    comparePackage() {
      this.setComparedPkgs(this.comparePkg);
      this.$router.push("comparePackages");
    },

    clearComps() {
      this.messages = 0;
      this.comparePkg = [];
    },

    comparefunc($event) {
      this.messages++;
      let pkg = $event;
      this.comparePkg.push(pkg);
      //console.log("this is name--->" + pkg.n);
    },
    filter() {
      let minPrice =
        this.price[0] < this.price[1] ? this.price[0] : this.price[1];
      let maxPrice =
        this.price[0] > this.price[1] ? this.price[0] : this.price[1];
      let minBandwidth =
        this.bandwidth[0] < this.bandwidth[1]
          ? this.bandwidth[0]
          : this.bandwidth[1];
      let maxBandwidth =
        this.bandwidth[0] > this.bandwidth[1]
          ? this.bandwidth[0]
          : this.bandwidth[1];
      let minDuration =
        this.duration[0] < this.duration[1]
          ? this.duration[0]
          : this.duration[1];
      let maxDuration =
        this.duration[0] > this.duration[1]
          ? this.duration[0]
          : this.duration[1];
      this.show = true;
      this.pkgs = [];
      console.log(minPrice, maxPrice);
      for (let pkg in this.allPkgs) {
        if (
          this.allPkgs[pkg].price >= minPrice &&
          this.allPkgs[pkg].price <= maxPrice &&
          this.allPkgs[pkg].bandwidth >= minBandwidth &&
          this.allPkgs[pkg].bandwidth <= maxBandwidth &&
          this.allPkgs[pkg].duration >= minDuration &&
          this.allPkgs[pkg].duration <= maxDuration
        ) {
          this.pkgs.push(this.allPkgs[pkg]);
        }
      }
    },
  },
};
</script>

<style scoped>
.outerdiv {
  padding-bottom: 100px;
  background-color: #e1e1e4;
}
.navContainer {
  background-color: rgb(255, 255, 255);
}
</style>
