<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-4" v-for="(pkg, i) in pkgs" :key="i">
          <card :name="pkg.name" :price="pkg.price"> </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import card from "./card.vue";

export default {
  components: { card },
  data: () => ({
    loading: false,
    selection: 1,
    pkgs: [],
  }),

  created() {
    axios
      .get("/api/package/fetch")
      .then((res) => {
        let allPkgs = res.data.data;
        for (let pkg in allPkgs) {
          this.pkgs.push(allPkgs[pkg]);
        }
        console.log(this.pkgs);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
