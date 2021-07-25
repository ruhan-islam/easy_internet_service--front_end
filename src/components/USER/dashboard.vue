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
import axios from "axios";
import topbar from "./topbar.vue";
import bottombar from "./bottombar.vue";
// import myOffers from "./offers.vue";

export default {
  components: {
    topbar,
    bottombar,
  },

  data() {
    return {
      pageInfo: "",
    };
  },

  mounted() {
    if (!this.getUserData) {
      this.fetchOwnData();
    }
  },

  computed: {
    ...mapGetters(["getUserID", "getUserData", "getUserName"]),
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

    showTickets() {
      this.pageInfo = "myTickets";
    },
  },
};
</script>
