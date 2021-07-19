<template>
  <div>
    <topbar></topbar>

    <div class="container mt-5">
      <!-- contents here  -->
      <!-- <v-btn @click="remove" :disabled="loading" color="primary">
        Cancel
      </v-btn> -->
      <span> {{ val }} </span>
    </div>

    <bottombar></bottombar>
  </div>
</template>

<script>
import topbar from "./topbar.vue";
import bottombar from "./bottombar.vue";

export default {
  components: { topbar, bottombar },
  data() {
    return {
      // loading: false,
      // val: 5,
    };
  },
  methods: {
    // async remove() {
    //   this.loading = true;
    //   await new Promise((resolve) => setTimeout(resolve, 3000));
    //   this.loading = false;
    // },

    remove() {
      // this.loading = true;
      // let interval = setInterval(() => {
      //   this.val--;
      //   if (this.val <= 0) {
      //     clearInterval(interval);
      //     this.loading = false;
      //     this.val = 5;
      //   }
      // }, 1000);
    },
  },

  computed: {},
};
</script>
