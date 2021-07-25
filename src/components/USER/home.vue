<template>
  <div>
    <topbar></topbar>

    <div class="ma-12 mb-12 container-flow">
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

  mounted() {
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
        .post("/api/user/fetchOwnData", {
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
