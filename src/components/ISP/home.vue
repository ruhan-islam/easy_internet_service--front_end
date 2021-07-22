<template>
  <div>
    <topbar></topbar>

    <div class="container mt-5">
      <!-- contents here  -->
    </div>

    <bottombar></bottombar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
import topbar from "./topbar.vue";
import bottombar from "./bottombar.vue";

export default {
  components: { topbar, bottombar },

  data() {
    return {};
  },

  created() {
    if (!this.getUserData) {
      this.fetchOwnData();
    }
  },

  computed: {
    ...mapGetters(["getUserID", "getUserData"]),
  },

  methods: {
    ...mapMutations(["setUserData"]),

    fetchOwnData() {
      axios
        .post("/api/isp/fetchOwnData", {
          id: this.getUserID,
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            this.setUserData(res.data);
            // console.log(this.userData);
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
