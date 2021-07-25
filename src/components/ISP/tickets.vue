<template>
  <div>
    <topbar></topbar>

    <div class="ma-12 mb-12 container-flow">
      <!-- contents here  -->
      <v-row> </v-row>
    </div>

    <bottombar></bottombar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import axios from "axios";
import topbar from "./topbar.vue";
import bottombar from "./bottombar.vue";

export default {
  components: { topbar, bottombar },

  data() {
    return {};
  },

  computed: {
    ...mapGetters([
      // "getAuthToken",
      // "getNtfCount",
    ]),
  },

  methods: {
    ...mapMutations([
      // "setNtfCount",
    ]),
  },
};
</script>
