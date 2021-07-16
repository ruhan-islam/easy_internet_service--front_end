<template>
  <div class="outerDiv">
    <headerr></headerr>
    <h1>Package Comparison</h1>
    <v-data-table
      :headers="headers"
      :items="comparePkg"
      :sort-by="['b', 'p', 'd']"
      :sort-desc="[false, true, false]"
      multi-sort
      class="elevation-1 innerDiv"
    ></v-data-table>
  </div>
</template>

<script>
import headerr from "./header.vue";
import { mapGetters } from "vuex";

export default {
  components: { headerr },
  data() {
    return {
      comparePkg: [],
      headers: [
        {
          text: "Package Name",
          align: "start",
          sortable: false,
          value: "n",
        },
        { text: "Bandwidth", value: "b" },
        { text: "Price", value: "p" },
        { text: "Duration (month)", value: "d" },
      ],
    };
  },

  computed: {
    ...mapGetters(["getComapredPkgs"]),
  },

  mounted() {
    this.comparePkg = this.getComapredPkgs;
  },
};
</script>

<style scoped>
.outerDiv {
  padding: 0% 0%;
}
.innerDiv {
  padding: 5% 10%;
}
</style>
