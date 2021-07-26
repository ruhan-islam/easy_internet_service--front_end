<template>
  <div>
    <topbar></topbar>

    <div class="ma-12 mb-12 container-flow">
      <!-- contents here  -->
      <v-row class="mb-12">
        {{ myPackageList[0] }}
      </v-row>
      <v-row class="mb-12">
        {{ myPaymentList[0] }}
      </v-row>
      <v-row class="mb-12">
        {{ userPackageList[0] }}
      </v-row>
      <v-row class="mb-12">
        {{ userPaymentList[0] }}
      </v-row>
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
      isLoadingMyPaymentList: true,
      isLoadingUserPaymentList: true,
      isLoadingMyPackageList: true,
      isLoadingUserPackageList: true,
      myPaymentList: [],
      userPaymentList: [],
      myPackageList: [],
      userPackageList: [],
    };
  },

  mounted() {
    if (!this.getUserData) {
      this.fetchOwnData();
    }

    this.fetchMyPackageList();
    this.fetchUserPackageList();
    this.fetchMyPaymentList();
    this.fetchUserPaymentList();
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

    fetchUserPackageList() {
      this.isLoadingUserPackageList = true;
      axios
        .post("/api/package/fetchByQuery", {
          packageCreator: this.getUserData.name,
        })
        .then((res) => {
          if (res.status === 200) {
            this.userPackageList = res.data.data;
            this.isLoadingUserPackageList = false;
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchUserPaymentList() {
      this.isLoadingUserPaymentList = true;
      axios
        .post("/api/payment/fetchAllUserOfIspPayment", {
          id: this.getUserID,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            // console.log(res.data);
            this.userPaymentList = res.data.reverse();
            for (let i in this.userPaymentList) {
              this.userPaymentList[i].payment_time = new Date(
                this.userPaymentList[i].payment_time
              );
              this.userPaymentList[i].payment_time = this.userPaymentList[
                i
              ].payment_time
                .toString()
                .slice(0, 24);
            }
            this.isLoadingUserPaymentList = false;
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchMyPackageList() {
      this.isLoadingMyPackageList = true;
      axios
        .post("/api/isp/fetchOwnPackageArray", {
          id: this.getUserID,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.myPackageList = res.data;
            // console.log(this.myPackageList);
            this.isLoadingMyPackageList = false;
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchMyPaymentList() {
      this.isLoadingMyPaymentList = true;
      axios
        .post("/api/payment/fetchIspOwnPayment", {
          id: this.getUserID,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            // console.log(res.data);
            this.myPaymentList = res.data.reverse();
            for (let i in this.myPaymentList) {
              this.myPaymentList[i].payment_time = new Date(
                this.myPaymentList[i].payment_time
              );
              this.myPaymentList[i].payment_time = this.myPaymentList[
                i
              ].payment_time
                .toString()
                .slice(0, 24);
            }
            this.isLoadingMyPaymentList = false;
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
