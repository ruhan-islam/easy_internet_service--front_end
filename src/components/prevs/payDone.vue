<template>
  <div>
    <headerr></headerr>
    <div>
      <v-row align="center" justify="space-around">
        Payment Successful <br />
        <br />
        <br />
      </v-row>
      <v-row align="center" justify="space-around">
        <v-btn depressed color="primary" @click="goToHome">
          Go to Home
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script>
import headerr from "./header.vue";
import { mapMutations } from "vuex";

export default {
  components: { headerr },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setIsPaid"]),
    goToHome() {
      this.setIsPaid(true);
      this.$router.push("/");
    },
  },
};
</script>
