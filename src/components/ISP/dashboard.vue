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

                <v-list-item link @click="selectPackage">
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

        <v-col class="mt-5 mb-5" cols="10" v-show="pageInfo === 'offers'">
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="80%">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  max-width="95%"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Create new Offer
                </v-btn>
              </template>

              <v-card style="padding: 30px">
                <h2>New Offer</h2>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <template v-slot:default="{ open }">
                          <v-row no-gutters>
                            <v-col cols="4"> Offer Name </v-col>
                            <v-col cols="8" class="text--secondary">
                              <v-fade-transition leave-absolute>
                                <span v-if="open" key="0">
                                  Enter the name of the offer
                                </span>
                                <span v-else key="1">
                                  {{ offerName }}
                                </span>
                              </v-fade-transition>
                            </v-col>
                          </v-row>
                        </template>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-text-field
                          placeholder="e.g. Super_cheap"
                          v-model="offerName"
                          :counter="nameLen"
                          :rules="offerNameRules"
                          label="Offer Name"
                          required
                        ></v-text-field>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <template v-slot:default="{ open }">
                          <v-row no-gutters>
                            <v-col cols="4"> Reduction(%) </v-col>
                            <v-col cols="8" class="text--secondary">
                              <v-fade-transition leave-absolute>
                                <span v-if="open" key="0">
                                  Enter the reduced percentage
                                </span>
                                <span v-else key="1">
                                  {{ reduction }}
                                </span>
                              </v-fade-transition>
                            </v-col>
                          </v-row>
                        </template>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-slider
                          v-model="reduction"
                          :min="1"
                          :max="100"
                          label="Reduction (%)"
                          thumb-label="always"
                        >
                        </v-slider>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header v-slot="{ open }">
                        <v-row no-gutters>
                          <v-col cols="4"> Start and end dates </v-col>
                          <v-col cols="8" class="text--secondary">
                            <v-fade-transition leave-absolute>
                              <span v-if="open"
                                >When do you want to start the offer?</span
                              >
                              <v-row v-else no-gutters style="width: 100%">
                                <v-col cols="6">
                                  Start date: {{ dates[0] || "Not set" }}
                                </v-col>
                                <v-col cols="6">
                                  End date: {{ dates[1] || "Not set" }}
                                </v-col>
                              </v-row>
                            </v-fade-transition>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-header>

                      <v-expansion-panel-content>
                        <v-row>
                          <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :close-on-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="dateRangeText"
                                label="Date range"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :rules="dateRules"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="dates"
                              :min="getToday"
                              @input="menu = dates.length === 2 ? false : true"
                              year-icon="mdi-calendar-blank"
                              prev-icon="mdi-skip-previous"
                              next-icon="mdi-skip-next"
                              range
                            ></v-date-picker>
                          </v-menu>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-card-actions>
                      <v-btn
                        :disabled="isResetDisabled"
                        color="error"
                        class="mr-4"
                        @click="resetPressed"
                      >
                        Reset
                      </v-btn>

                      <v-btn
                        :disabled="isSubmitDisabled"
                        color="success"
                        class="mr-4"
                        @click="submitPressed"
                      >
                        Confirm
                      </v-btn>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                      >
                        Cancel
                      </v-btn>
                    </v-card-actions>
                  </v-expansion-panels>
                </v-form>
              </v-card>
            </v-dialog>
          </v-row>

          <v-row>
            <div class="col-lg-4" v-for="(offer, i) in allOffers" :key="i">
              <v-badge
                :content="0"
                :value="0"
                color="red"
                overlap
                icon="mdi-home"
              >
                <v-card class="mx-auto" max-width="344">
                  <v-img src="./../../assets/offer.jpg" height="200px"></v-img>

                  <v-card-title>
                    {{ offer.name }} &nbsp;
                    <v-chip v-if="!offer.status" color="red"> Expired </v-chip>
                  </v-card-title>

                  <v-card-subtitle>
                    <h2 style="color:red">{{ offer.reduction }}% off</h2>
                  </v-card-subtitle>

                  <!-- <v-card-actions>
                    <v-btn color="orange lighten-2" text> Details </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="show = !show">
                      <v-icon>{{
                        show ? "mdi-chevron-up" : "mdi-chevron-down"
                      }}</v-icon>
                    </v-btn>
                  </v-card-actions> -->

                  <v-expand-transition>
                    <div>
                      <v-divider></v-divider>

                      <v-card-text>
                        <v-timeline align-top dense>
                          <v-timeline-item color="green" small>
                            <div>
                              <div class="font-weight-normal">
                                <strong>Start Time</strong> @
                                {{ offer.startTime.slice(0, 10) }}
                              </div>
                            </div>
                          </v-timeline-item>
                          <v-timeline-item color="red" small>
                            <div>
                              <div class="font-weight-normal">
                                <strong>Expiry Time</strong> @
                                {{ offer.expirationTime.slice(0, 10) }}
                              </div>
                            </div>
                          </v-timeline-item>
                        </v-timeline>
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-badge>
            </div>
          </v-row>
        </v-col>

        <v-col class="mt-5 mb-5" cols="10" v-show="pageInfo === 'myPackage'">
          <selectPackage></selectPackage>
        </v-col>

        <v-col class="mt-5 mb-5" cols="10" v-show="pageInfo === 'tickets'">
        </v-col>

        <v-col class="mt-5 mb-5" cols="10" v-show="pageInfo === 'myPayment'">
          <payBill></payBill>
        </v-col>

        <!-- <v-col class="mt-5 mb-5" cols="10" v-show="pageInfo === 'notify'">
          <v-form ref="form" v-model="valid" lazy-validation>
            <div style="width:80%">
              <v-text-field
                v-model="ispName"
                :rules="ispNameRules"
                label="ISP name"
                required
              ></v-text-field>
              <v-text-field
                v-model="subject"
                :rules="subjectRules"
                label="Subject"
                required
              ></v-text-field>
              <v-textarea
                color="teal"
                v-model="details"
                :rules="detailsRules"
                label="Details"
                required
              >
              </v-textarea>

              <v-card-actions>
                <v-btn
                  :disabled="isSendDisabled"
                  color="success"
                  class="mr-4"
                  @click="sendPressed"
                >
                  Send
                </v-btn>
              </v-card-actions>

              <v-snackbar :value="showSnackbar">
                Notification Sent
              </v-snackbar>
            </div>
          </v-form>
        </v-col> -->
      </v-row>
    </div>

    <bottombar></bottombar>
  </div>
</template>

<script>
import axios from "axios";
import topbar from "./topbar.vue";
import bottombar from "./bottombar.vue";
import { mapGetters } from "vuex";
import selectPackage from "./selectPackage.vue";
import payBill from "./payBill.vue";

export default {
  components: { topbar, bottombar, selectPackage, payBill },

  data() {
    return {
      pageInfo: "",

      allOffers: [],
      validOffers: [],
      allPkgs: [],
      pkgs: [],
      currPkgIdx: -1,
      dialog2: false,
      filterPrice: [0, 1000000],
      filterBW: [1, 200],
      filterDuration: [1, 24],
      sortedItems: [
        "Name 🔺",
        "Name 🔻",
        "Price 🔺",
        "Price 🔻",
        "Duration 🔺",
        "Duration 🔻",
        "Bandwidth 🔺",
        "Bandwidth 🔻",
      ],
    };
  },

  created() {
    axios
      .post("/api/offer/fetchByQuery", {
        creator: "Nttn",
      })
      .then((res) => {
        if (res.status === 200) {
          this.allOffers = res.data.data;
          // console.log(this.allOffers);
          this.validOffers = [];
          for (let i in this.allOffers) {
            if (
              this.allOffers[i].expirationTime.slice(0, 10) >= this.getToday()
            ) {
              this.validOffers.push(this.allOffers[i]);
            }
          }
        } else {
          this.error = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/package/fetchByQuery", {
        packageCreator: "Nttn",
      })
      .then((res) => {
        if (res.status === 200) {
          this.allPkgs = res.data.data;
          this.pkgs = this.allPkgs;
        } else {
          this.error = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    selectPackage() {
      this.pageInfo = "myPackage";
    },

    makePayment() {
      this.pageInfo = "myPayment";
    },

    getOfferName(offerId) {
      if (offerId === "-1") {
        return;
      }
      for (let i in this.allOffers) {
        if (this.allOffers[i]._id === offerId) {
          return this.allOffers[i].name;
        }
      }
    },

    calculateReducedPrice(price, offerId) {
      let percentage = 0;
      if (offerId === "-1") {
        return;
      }
      for (let i in this.allOffers) {
        if (this.allOffers[i]._id === offerId) {
          percentage = this.allOffers[i].reduction;
          break;
        }
      }
      return price - (price * percentage) / 100.0;
    },

    doSort(item) {
      if (item == "Price 🔺") {
        this.pkgs.sort(this.orderByPriceAscending);
      } else if (item == "Duration 🔺") {
        this.pkgs.sort(this.orderByDurationAscending);
      } else if (item == "Bandwidth 🔺") {
        this.pkgs.sort(this.orderByBandwidthAscending);
      } else if (item == "Name 🔺") {
        this.pkgs.sort(this.orderByNameAscending);
      } else if (item == "Price 🔻") {
        this.pkgs.sort(this.orderByPriceDescending);
      } else if (item == "Duration 🔻") {
        this.pkgs.sort(this.orderByDurationDescending);
      } else if (item == "Bandwidth 🔻") {
        this.pkgs.sort(this.orderByBandwidthDescending);
      } else if (item == "Name 🔻") {
        this.pkgs.sort(this.orderByNameDescending);
      }
    },

    orderByNameAscending(a, b) {
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      }
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      }
      return 0;
    },

    orderByPriceAscending(a, b) {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    },

    orderByBandwidthAscending(a, b) {
      if (a.bandwidth < b.bandwidth) {
        return -1;
      }
      if (a.bandwidth > b.bandwidth) {
        return 1;
      }
      return 0;
    },

    orderByDurationAscending(a, b) {
      if (a.duration < b.duration) {
        return -1;
      }
      if (a.duration > b.duration) {
        return 1;
      }
      return 0;
    },

    orderByNameDescending(a, b) {
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return -1;
      }
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return 1;
      }
      return 0;
    },

    orderByPriceDescending(a, b) {
      if (a.price > b.price) {
        return -1;
      }
      if (a.price < b.price) {
        return 1;
      }
      return 0;
    },

    orderByBandwidthDescending(a, b) {
      if (a.bandwidth > b.bandwidth) {
        return -1;
      }
      if (a.bandwidth < b.bandwidth) {
        return 1;
      }
      return 0;
    },

    orderByDurationDescending(a, b) {
      if (a.duration > b.duration) {
        return -1;
      }
      if (a.duration < b.duration) {
        return 1;
      }
      return 0;
    },

    getToday() {
      let today = new Date();
      today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
      return today.toISOString().slice(0, 10);
    },

    detailsPressed(i) {
      this.currPkgIdx = i;
      this.dialog2 = true;
      // console.log(this.currPkgIdx);
    },

    doFilter() {
      let minPrice =
        this.filterPrice[0] < this.filterPrice[1]
          ? this.filterPrice[0]
          : this.filterPrice[1];
      let maxPrice =
        this.filterPrice[0] > this.filterPrice[1]
          ? this.filterPrice[0]
          : this.filterPrice[1];
      let minBandwidth =
        this.filterBW[0] < this.filterBW[1]
          ? this.filterBW[0]
          : this.filterBW[1];
      let maxBandwidth =
        this.filterBW[0] > this.filterBW[1]
          ? this.filterBW[0]
          : this.filterBW[1];
      let minDuration =
        this.filterDuration[0] < this.filterDuration[1]
          ? this.filterDuration[0]
          : this.filterDuration[1];
      let maxDuration =
        this.filterDuration[0] > this.filterDuration[1]
          ? this.filterDuration[0]
          : this.filterDuration[1];
      this.pkgs = [];
      // console.log(minPrice, maxPrice);
      for (let pkg in this.allPkgs) {
        if (
          this.allPkgs[pkg].price >= minPrice &&
          this.allPkgs[pkg].price <= maxPrice &&
          this.allPkgs[pkg].bandwidth >= minBandwidth &&
          this.allPkgs[pkg].bandwidth <= maxBandwidth &&
          this.allPkgs[pkg].duration >= minDuration &&
          this.allPkgs[pkg].duration <= maxDuration
        ) {
          this.pkgs.push(this.allPkgs[pkg]);
        }
      }
      this.markVal = 0;
    },

    clearFilter() {
      this.filterPrice = [0, 1000000];
      this.filterBW = [1, 200];
      this.filterDuration = [1, 24];
      this.pkgs = this.allPkgs;
    },
  },

  computed: {
    ...mapGetters(["getUserName"]),
  },
};
</script>
