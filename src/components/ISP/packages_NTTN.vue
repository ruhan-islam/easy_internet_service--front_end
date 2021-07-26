<template>
  <div class="ma-12 mb-12 container-flow">
    <!-- contents here  -->

    <!-- loading -->
    <v-progress-linear
      v-if="isLoading"
      style="margin:10% 0"
      color="deep-purple accent-4"
      indeterminate
      rounded
      height="6"
    ></v-progress-linear>

    <!-- package filters  -->
    <v-row v-if="!isLoading" justify="center">
      <v-card style="padding:0px 20px">
        <v-card-title>Search ISP Packages</v-card-title>
        <v-expansion-panels>
          <v-col>
            Price Range:
            <v-expansion-panel>
              <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                  <v-row no-gutters>
                    <v-col class="text--secondary">
                      <v-fade-transition leave-absolute>
                        <span v-if="open">Select the max and min price:</span>
                        <v-row v-else no-gutters style="width: 100%">
                          <v-col cols="6" style="color: green">
                            Min Cost:
                            {{ filterPrice[0] }}
                          </v-col>
                          <v-col cols="6" style="color: red">
                            Max Cost: {{ filterPrice[1] }}
                          </v-col>
                        </v-row>
                      </v-fade-transition>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-range-slider
                  v-model="filterPrice"
                  label="Price (Taka)"
                  min="0"
                  max="1000000"
                  step="1000"
                >
                </v-range-slider>
                <label style="color: rgb(97, 91, 91)"
                  >price(min): {{ filterPrice[0] }} <br />
                  price(max): {{ filterPrice[1] }}</label
                >
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>
          <v-col>
            Bandwidth Range:
            <v-expansion-panel>
              <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                  <v-row no-gutters>
                    <v-col class="text--secondary">
                      <v-fade-transition leave-absolute>
                        <span v-if="open"
                          >Select the max and min bandwidth:</span
                        >
                        <v-row v-else no-gutters style="width: 100%">
                          <v-col cols="6" style="color: green">
                            Min BW:
                            {{ filterBW[0] }}
                          </v-col>
                          <v-col cols="6" style="color: red">
                            Max BW: {{ filterBW[1] }}
                          </v-col>
                        </v-row>
                      </v-fade-transition>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-range-slider
                  v-model="filterBW"
                  label="Bandwidth (GBPS)"
                  min="0"
                  max="100"
                  thumb-label="always"
                >
                </v-range-slider>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>

          <v-col>
            Duration Range(months):
            <v-expansion-panel>
              <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                  <v-row no-gutters>
                    <v-col class="text--secondary">
                      <v-fade-transition leave-absolute>
                        <span v-if="open"
                          >Select the max and min duration:</span
                        >
                        <v-row v-else no-gutters style="width: 100%">
                          <v-col cols="6" style="color: green">
                            Min Period:
                            {{ filterDuration[0] }}
                          </v-col>
                          <v-col cols="6" style="color: red">
                            Max Period: {{ filterDuration[1] }}
                          </v-col>
                        </v-row>
                      </v-fade-transition>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-range-slider
                  v-model="filterDuration"
                  label="Duration (Months)"
                  min="0"
                  max="24"
                  thumb-label="always"
                >
                </v-range-slider>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>
        </v-expansion-panels>
        <v-card-actions>
          <v-row align="center" justify="end">
            <v-col cols="6"></v-col>
            <v-col>
              <v-btn
                color="deep-purple lighten-2"
                @click="doFilter"
                dark
                max-width="80%"
                margin="10px"
              >
                Filter <v-icon>mdi-filter</v-icon>
              </v-btn>
            </v-col>

            <v-col>
              <v-btn
                color="deep-purple lighten-2"
                @click="clearFilter"
                dark
                margin="10px"
              >
                Clear Filter
              </v-btn>
            </v-col>

            <v-col>
              <v-menu offset-y>
                <template v-slot:activator="{ attrs, on }">
                  <v-btn
                    color="deep-purple lighten-2"
                    class="white--text ma-5"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Sort <v-icon>mdi-sort</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item v-for="item in sortedItems" :key="item" link>
                    <v-list-item-title
                      v-text="item"
                      @click="doSort(item)"
                    ></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-row>

    <!-- show ISP packages -->
    <v-row v-if="!isLoading" justify="center">
      <div class="col-lg-5" v-for="(pkg, i) in allPkgs" :key="i">
        <v-card>
          <v-img height="250" src="./../../assets/images.jpg"></v-img>

          <v-card-title>
            {{ pkg.data.name }} &nbsp;
            <v-chip v-if="!pkg.data.ongoing" color="red"> Disabled </v-chip>
          </v-card-title>

          <v-card-text>
            <div class="my-4 text-subtitle-1">
              Taka
              <span v-if="!pkg.data.offerId"> {{ pkg.data.price }} </span>
              <template v-if="!!pkg.data.offerId">
                <s>{{ pkg.data.price }}</s>
                <span>
                  &nbsp;
                  {{ calculateReducedPrice(pkg.data.price, pkg.data.offerId) }}
                </span>
                <v-chip color="deep-purple">
                  <span style="color:white">
                    {{ getOfferName(pkg.data.offerId) }}
                  </span>
                </v-chip>
              </template>
            </div>
            <v-chip-group
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip v-for="(area, i) in pkg.data.areas" :key="i"
                >{{ area }}
              </v-chip>
            </v-chip-group>
            <v-chip-group
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip>{{ pkg.data.bandwidth }} GBPS</v-chip>
              <v-chip>{{ pkg.data.duration }} months</v-chip>
            </v-chip-group>

            <div>
              {{ pkg.bandwidth }} GBPS speed relentless speed of unlimited
              traffic with 24/7 service.
            </div>
          </v-card-text>

          <v-card-actions>
            <v-col></v-col>
            <v-col>
              <v-btn
                color="deep-purple lighten-2"
                @click="detailsPressed(i)"
                text
              >
                Details
              </v-btn>
            </v-col>
            <v-col></v-col>
            <v-col>
              <v-btn
                :disabled="!allPkgs[i].data.ongoing || !allPkgs[i].status"
                color="deep-purple lighten-2"
                @click="selectPressed(i)"
                text
              >
                Select
              </v-btn>
            </v-col>
            <v-col></v-col>
          </v-card-actions>
        </v-card>
      </div>
    </v-row>

    <!-- details -->
    <v-row v-if="currPkgIdx !== -1" justify="center">
      <v-dialog v-model="dialog2" max-width="70%">
        <v-card>
          <v-card-title class="text-h5">
            {{ allPkgs[currPkgIdx].data.name }}
          </v-card-title>

          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Features</th>
                    <th class="text-left">Availibility</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Package Name</td>
                    <td>{{ allPkgs[currPkgIdx].data.name }}</td>
                  </tr>
                  <tr>
                    <td>Base Price</td>
                    <td>Tk. {{ allPkgs[currPkgIdx].data.price }} /ISP</td>
                  </tr>
                  <tr v-if="!!allPkgs[currPkgIdx].data.offerId">
                    <td>Reduced Price</td>
                    <td>
                      Tk.
                      {{
                        calculateReducedPrice(
                          allPkgs[currPkgIdx].data.price,
                          allPkgs[currPkgIdx].data.offerId
                        )
                      }}
                      /ISP
                    </td>
                  </tr>
                  <tr>
                    <td>Bandwidth</td>
                    <td>{{ allPkgs[currPkgIdx].data.bandwidth }} GBPS</td>
                  </tr>
                  <tr>
                    <td>Duration</td>
                    <td>{{ allPkgs[currPkgIdx].data.duration }} months</td>
                  </tr>
                  <tr>
                    <td>Coverage Area</td>
                    <td>{{ allPkgs[currPkgIdx].data.areas }}</td>
                  </tr>
                  <tr>
                    <td>Upload Speed</td>
                    <td>{{ allPkgs[currPkgIdx].data.up_speed }} GBPS</td>
                  </tr>
                  <tr>
                    <td>Download Speed</td>
                    <td>{{ allPkgs[currPkgIdx].data.down_speed }} GBPS</td>
                  </tr>
                  <tr>
                    <td>Data Limit</td>
                    <td>Unlimited</td>
                  </tr>
                  <tr>
                    <td>Estimated Down Time</td>
                    <td>{{ allPkgs[currPkgIdx].data.downTime }} hrs</td>
                  </tr>
                  <tr>
                    <td>Estimated Response Time</td>
                    <td>
                      {{ allPkgs[currPkgIdx].data.responseTime }} milliseconds
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>

          <v-card-actions>
            <v-col></v-col>
            <v-col>
              <v-btn
                color="green darken-1"
                text
                @click="
                  dialog2 = false;
                  currPkgIdx = -1;
                "
              >
                Close
              </v-btn>
            </v-col>
            <v-col></v-col>
            <v-col>
              <v-btn
                :disabled="
                  !allPkgs[currPkgIdx].data.ongoing ||
                    !allPkgs[currPkgIdx].status
                "
                color="deep-purple lighten-2"
                @click="selectPressed(currPkgIdx)"
                text
              >
                Select
              </v-btn>
            </v-col>
            <v-col></v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
// import payments from "./payments";

export default {
  // components: { payments },

  data() {
    return {
      isLoading: true,
      valid: false,
      dialog2: false,
      showPayment: false,
      selectedPkg: {},

      showSnackbar: false,
      pageInfo: "",
      myPackageList: [],
      allOffers: [],
      validOffers: [],
      allPkgs: [],
      pkgs: [],
      currPkgIdx: -1,
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

  computed: {
    ...mapGetters(["getUserData", "getSelectedPkg"]),
  },

  mounted() {
    this.fetchAllOffers();
    this.fetchAllPackages();
    this.showPayment = false;
  },

  methods: {
    ...mapMutations(["setSelectedPkg"]),

    fetchAllPackages() {
      this.isLoading = true;

      axios
        .post("/api/package/fetchByQueryWithStatus", {
          type: 2,
          id: this.getUserData._id,
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            this.allPkgs = res.data;
            for (let i in this.allPkgs) {
              // console.log(this.allPkgs[i].areas);
              if (
                this.allPkgs[i].data.areas.includes("Nation-wide") ||
                this.allPkgs[i].data.areas.includes(this.getUserData.region)
              ) {
                // console.log("in");
                this.pkgs.push(this.allPkgs[i]);
              }
            }
            this.allPkgs = this.pkgs;
            this.isLoading = false;
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchAllOffers() {
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
    },

    findIdx(myPkg) {
      this.currPkgIdx = -1;
      for (let i in this.allPkgs) {
        if (this.allPkgs[i].data._id === myPkg._id) {
          this.currPkgIdx = i;
          break;
        }
      }
      if (this.currPkgIdx !== -1) {
        this.dialog2 = true;
      }
    },

    selectPressed(i) {
      // console.log(i);
      this.setSelectedPkg(this.allPkgs[i].data);
      console.log(this.getSelectedPkg);
      this.$router.push("/ISP/payments");
      // this.showPayment = true;
    },

    detailsPressed(i) {
      this.currPkgIdx = i;
      this.dialog2 = true;
      // console.log(this.currPkgIdx);
    },

    isProceedDisabled() {
      return !(this.valid && this.amount);
    },

    getOfferName(offerId) {
      if (!offerId) {
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
      if (!offerId) {
        return price;
      }
      for (let i in this.allOffers) {
        if (this.allOffers[i]._id === offerId) {
          percentage = this.allOffers[i].reduction;
          break;
        }
      }
      return price - (price * percentage) / 100.0;
    },

    getToday() {
      let today = new Date();
      today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
      return today.toISOString().slice(0, 10);
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
};
</script>
