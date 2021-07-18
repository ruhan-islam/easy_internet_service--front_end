<template>
  <!-- <headerr></headerr> -->
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
// import headerr from "./components/header.vue";
import { mapMutations } from "vuex";
// import axios from "axios";

export default {
  // components: { headerr },
  name: "App",

  computed: {
    // ...mapGetters(["getNtfCount"]),
    ...mapMutations(["setNtfCount"]),
  },

  // created() {
  //   console.log("aaaaa");
  //   let cc = 0;
  //   setTimeout(() => {
  //     axios
  //       .get("/api/notification/random")
  //       .then((res) => {
  //         if (res.status == 200) {
  //           cc = res.data.Random;
  //         } else {
  //           cc = 0;
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     this.setNtfCount(cc);
  //   }, 1000);
  // },
};
</script>
