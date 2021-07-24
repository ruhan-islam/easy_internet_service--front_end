<template>
  <div>
    <topbar></topbar>

    <div class="container-flow">
      <!-- contents here  -->
      <v-row>
        <!-- sidebar -->
        <v-col cols="2">
          <v-card height="500">
            <v-navigation-drawer width="100%">
              <v-list>
                <v-list-item class="px-2">
                  <v-list-item-avatar>
                    <v-img
                      src="https://media-eng.dhakatribune.com/uploads/2013/11/BTRC-logo_14-1.jpg"
                    ></v-img>
                  </v-list-item-avatar>
                </v-list-item>

                <v-list-item link>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">
                      {{ getUserName }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list nav dense>
                <v-list-item link @click="showOffers">
                  <v-list-item-icon>
                    <v-icon color="isInOffer ? 'green' : 'red'">
                      mdi-folder
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    Offers
                  </v-list-item-title>
                </v-list-item>

                <v-list-item link @click="showTickets">
                  <v-list-item-icon>
                    <v-icon color="getColor"> mdi-account-multiple </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title> Tickets </v-list-item-title>
                </v-list-item>

                <v-list-item link @click="showPackages">
                  <v-list-item-icon>
                    <v-icon color="getColor"> mdi-star </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title> My Package </v-list-item-title>
                </v-list-item>

                <v-list-item link @click="makePayment">
                  <v-list-item-icon>
                    <v-icon color="getColor"> mdi-star </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title> My Payment </v-list-item-title>
                </v-list-item>

                <v-list-item link @click="sendNotification">
                  <v-list-item-icon>
                    <v-icon color="getColor"> mdi-star </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title> Notify </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card>
        </v-col>

        <!-- <v-col class="mt-5 mb-5" cols="10" v-show="pageInfo === 'myOffers'">
          <myOffers></myOffers>
        </v-col> -->

        <v-col class="mt-5 mb-5" cols="10" v-show="pageInfo === 'myPackages'">
          <myPackages></myPackages>
        </v-col>

        <v-col class="mt-5 mb-5" cols="10" v-show="pageInfo === 'myTickets'">
        </v-col>

        <v-col class="mt-5 mb-5" cols="10" v-show="pageInfo === 'myPayments'">
          <myPayments></myPayments>
        </v-col>

        <v-col class="mt-5 mb-5" cols="10" v-show="pageInfo === 'notify'">
          <myNotifys></myNotifys>
        </v-col>
      </v-row>
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
import myNotifys from "./myNotifys.vue";
import myPackages from "./myPackages.vue";
import myPayments from "./myPayments.vue";

export default {
  components: {
    topbar,
    bottombar,
    myNotifys,
    // myOffers,
    myPackages,
    myPayments,
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

    sendNotification() {
      this.pageInfo = "notify";
    },

    showTickets() {
      this.pageInfo = "myTickets";
    },

    showOffers() {
      this.pageInfo = "myOffers";
    },

    showPackages() {
      this.pageInfo = "myPackages";
    },

    makePayment() {
      this.pageInfo = "myPayments";
    },
  },
};
</script>
