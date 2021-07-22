<template>
  <div>
    <topbar></topbar>

    <v-container>
      <v-row justify="center">
        <v-col></v-col>
        <v-col>
          <v-radio-group v-model="selectedOpt">
            <v-radio
              key="nttn"
              label="packages from NTTN"
              value="nttn"
            ></v-radio>
            <v-radio
              key="user"
              label="packages for users"
              value="user"
            ></v-radio>
          </v-radio-group>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>

    <pkgNTTN v-if="selectedOpt === 'nttn'"></pkgNTTN>
    <pkgUSER v-if="selectedOpt === 'user'"></pkgUSER>

    <bottombar></bottombar>
  </div>
</template>

<script>
// import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
import topbar from "./topbar.vue";
import bottombar from "./bottombar.vue";
import pkgNTTN from "./packages_NTTN.vue";
import pkgUSER from "./packages_USER.vue";

export default {
  components: { topbar, bottombar, pkgNTTN, pkgUSER },

  data() {
    return {
      selectedOpt: "nttn",
    };
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
