<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="250" src="../assets/images.jpg"></v-img>

    <v-card-title> {{ name }} </v-card-title>

    <v-card-text>
      <div class="my-4 text-subtitle-1">Taka {{ price }}</div>
      <div>
        {{ bandwidth }} GBPS speed relentless speed of unlimited traffic with 24/7 service.
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="detailsMethod">
        Details
      </v-btn>
      <v-btn color="deep-purple lighten-2" text @click="compare">
        Add to Compare
      </v-btn>
    </v-card-actions>
    
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: ["name", "price", "bandwidth", "duration"],
  data: () => ({
    loading: false,
    selection: 1,
    pkgs: [],
    pkg: "",
  }),

  methods: {
    ...mapMutations([
      "setSelPkgName",
      "setSelPkgPrice",
      "setSelPkgBand",
      "setSelPkgDur",
    ]),
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },

    detailsMethod() {
      //console.log(pkg);
      //this.setSelectedPackage(pkg);
      this.setSelPkgName(this.name);
      this.setSelPkgPrice(this.price);
      this.setSelPkgBand(this.bandwidth);
      this.setSelPkgDur(this.duration);
      // this.pkg = {
      //   name: this.name,
      //   price: this.price,
      //   bandwidth: this.bandwidth,
      //   duration: this.duration,
      // };
      // this.setSelectedPackage(this.pkg);
      this.$router.push("selectPkg");
    },
    compare() {
      //this.message=10;
      let pkg = {
        n: this.name,
        p: this.price,
        b: this.bandwidth,
        d: this.duration,
      };
      this.$emit("addedtocompare", pkg);
      //this.loading = true;
      //setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>

<style scoped>
 .card-design
 {
   text-align: center;
   }
</style>