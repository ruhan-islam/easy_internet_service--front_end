<template>
  <div>
    <topbar></topbar>

    <div class="container mt-5">
      <!-- contents here  -->

      <!-- adding new package  -->

      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="80%">
          <template v-slot:activator="{ on, attrs }">
            <v-btn mb-5 color="primary" dark v-bind="attrs" v-on="on">
              Create new package
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5">
              New Package
            </v-card-title>

            <v-card-text>
              <template>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="packageName"
                        :counter="nameLen"
                        :rules="nameRules"
                        label="Package Name"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="price"
                        :rules="priceRules"
                        label="Price (BDT)"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-autocomplete
                        v-model="areas"
                        :items="areaList"
                        label="Coverage Area"
                        :rules="areaRules"
                        multiple
                      ></v-autocomplete>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-slider
                        v-model="bandwidth"
                        :min="minBW"
                        :max="maxBW"
                        label="Bandwidth (GBPS)"
                        class="align-center"
                        thumb-label="always"
                      >
                      </v-slider>
                    </v-col>

                    <v-col>
                      <v-slider
                        v-model="duration"
                        :min="minDur"
                        :step="stepDur"
                        :max="maxDur"
                        label="Duration (month)"
                        class="align-center"
                        thumb-label="always"
                      >
                      </v-slider>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-slider
                        v-model="downSpeed"
                        :min="minBW"
                        :max="maxBW"
                        label="Download speed (GBPS)"
                        thumb-label="always"
                        :rules="speedRules"
                      >
                      </v-slider>
                    </v-col>

                    <v-col>
                      <v-slider
                        v-model="upSpeed"
                        :min="minBW"
                        :max="maxBW"
                        label="Upload speed (GBPS)"
                        thumb-label="always"
                        :rules="speedRules"
                      >
                      </v-slider>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-slider
                        v-model="downtime"
                        :min="minDT"
                        :step="stepDT"
                        :max="maxDT"
                        label="Down-time (hour)"
                        thumb-label="always"
                      >
                      </v-slider>
                    </v-col>

                    <v-col>
                      <v-slider
                        v-model="responseTime"
                        :min="minRT"
                        :step="stepRT"
                        :max="maxRT"
                        label="Response Time (milliseconds)"
                        thumb-label="always"
                      >
                      </v-slider>
                    </v-col>
                  </v-row>
                </v-form>
              </template>
            </v-card-text>

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
              <v-btn color="green darken-1" text @click="dialog = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row class="ma-10" justify="center">
        <div class="row filterDiv">
          <div class="col-lg-3">
            <v-range-slider
              v-model="filterPrice"
              label="Price (Taka)"
              min="0"
              max="1000000"
              step="1000"
            >
            </v-range-slider>
            <label>{{ filterPrice }}</label>
          </div>

          <div class="col-lg-3">
            <v-range-slider
              v-model="filterBW"
              label="Bandwidth (GBPS)"
              min="0"
              max="100"
            >
            </v-range-slider>
            <label>{{ filterBW }}</label>
          </div>

          <div class="col-lg-3">
            <v-range-slider
              v-model="filterDuration"
              label="Duration (Months)"
              min="0"
              max="24"
            >
            </v-range-slider>
            <label>{{ filterDuration }}</label>
          </div>
          <div class="col-lg-3">
            <v-btn depressed color="primary" @click="doFilter">
              Filter
            </v-btn>
          </div>
        </div>
      </v-row>

      <v-row>
        <div class="col-lg-4" v-for="(pkg, i) in pkgs" :key="i">
          <v-badge :content="0" :value="0" color="red" overlap icon="mdi-home">
            <v-card>
              <v-img height="250" src="./../../assets/images.jpg"></v-img>

              <v-card-title> {{ pkg.name }} </v-card-title>

              <v-card-text>
                <div class="my-4 text-subtitle-1">Taka {{ pkg.price }}</div>
                <div>
                  {{ pkg.bandwidth }} GBPS speed relentless speed of unlimited
                  traffic with 24/7 service.
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="deep-purple lighten-2"
                  @click="detailsPressed(i)"
                  text
                >
                  Details
                </v-btn>
                <v-btn color="deep-purple lighten-2" text>
                  Mark
                </v-btn>
                <v-btn color="deep-purple lighten-2" text>
                  Disable
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-badge>
        </div>
      </v-row>

      <v-row v-if="currPkgIdx != -1" justify="center">
        <v-dialog v-model="dialog2" persistent max-width="80%">
          <v-card>
            <v-card-title class="text-h5">
              {{ nameList[currPkgIdx] }}
            </v-card-title>

            <v-card-text>
              object: {{ allPkgs[currPkgIdx] }} <br />
              name: {{ allPkgs[currPkgIdx].name }} <br />
              bandwidth: {{ allPkgs[currPkgIdx].bandwidth }} GBPS <br />
            </v-card-text>

            <v-card-actions>
              <v-btn color="green darken-1" text @click="dialog2 = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <bottombar></bottombar>
  </div>
</template>

<script>
import axios from "axios";
import topbar from "./topbar.vue";
import bottombar from "./bottombar.vue";

export default {
  components: { topbar, bottombar },

  data() {
    return {
      valid: false,
      dialog: false,
      dialog2: false,
      currPkgIdx: -1,

      areas: [],
      areaList: [
        "Nation-wide",
        "Dhaka",
        "Rajshahi",
        "Chittagong",
        "Mymensingh",
        "Khulna",
        "Barishal",
        "Sylhet",
        "Rangpur",
      ],
      areaRules: [
        (v) => !!v.length || "This field is required",
        (v) =>
          !(v.length > 1 && this.areas.includes(this.areaList[0])) ||
          "Invalid combination",
      ],

      packageName: "",
      nameLen: 20,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => !this.nameList.includes(v.trim()) || "Name already in use",
        (v) =>
          (v && v.length <= this.nameLen) ||
          `Name must be less than ${this.nameLen} characters`,
      ],

      price: "",
      priceRules: [
        (v) => !!v || "price is required",
        (v) => /^\d*$/.test(v) || "price must be valid",
      ],

      bandwidth: "",
      upSpeed: "",
      downSpeed: "",
      minBW: 1,
      maxBW: 200,

      speedRules: [(v) => v <= this.bandwidth || "must be less than bandwidth"],

      duration: "",
      minDur: 3,
      stepDur: 3,
      maxDur: 24,

      downtime: "",
      minDT: 0,
      stepDT: 0.5,
      maxDT: 12,

      responseTime: "",
      minRT: 1,
      stepRT: 1,
      maxRT: 200,

      allPkgs: [],
      pkgs: [],
      dummyPkg: "",

      nameList: [],

      filterPrice: [0, 1000000],
      filterBW: [0, 200],
      filterDuration: [0, 24],

      pMin: "",
      pMax: "",
      bwMin: "",
      bwMax: "",
      dMin: "",
      dMax: "",
    };
  },

  computed: {
    isSubmitDisabled() {
      return !(
        this.valid &&
        this.packageName &&
        this.bandwidth &&
        this.duration &&
        this.price &&
        this.areas.length
      );
    },

    isResetDisabled() {
      return !(
        this.packageName ||
        this.price ||
        this.areas.length ||
        this.bandwidth > this.minBW ||
        this.duration > this.minDur ||
        this.upSpeed > this.bandwidth ||
        this.downSpeed > this.bandwidth ||
        this.downtime > 0 ||
        this.responseTime > this.minRT
      );
    },
  },

  created() {
    axios
      .post("/api/package/fetchByQuery", {
        packageCreator: "Nttn",
      })
      .then((res) => {
        this.allPkgs = res.data.data;
        this.pkgs = this.allPkgs;
        this.nameList = [];

        // let minPrice = Infinity;
        // let maxPrice = -1;
        // let minBW = Infinity;
        // let maxBW = -1;
        // let minDuration = Infinity;
        // let maxDuration = -1;

        for (let i in this.pkgs) {
          this.nameList.push(this.allPkgs[i].name);

          // if (this.allPkgs[i].price < minPrice)
          //   minPrice = this.allPkgs[i].price;
          // if (this.allPkgs[i].price > maxPrice)
          //   maxPrice = this.allPkgs[i].price;
          // if (this.allPkgs[i].bandwidth < minBW)
          //   minBW = this.allPkgs[i].bandwidth;
          // if (this.allPkgs[i].bandwidth > maxBW)
          //   maxBW = this.allPkgs[i].bandwidth;
          // if (this.allPkgs[i].duration < minDuration)
          //   minDuration = this.allPkgs[i].duration;
          // if (this.allPkgs[i].duration > maxDuration)
          //   maxDuration = this.allPkgs[i].duration;
        }

        // this.pMin = minPrice;
        // this.pMax = maxPrice;
        // this.filterPrice.push(minPrice);
        // this.filterPrice.push(maxPrice);
        // this.bwMin = minBW;
        // this.bwMax = maxBW;
        // this.dMin = minDuration;
        // this.dMax = maxDuration;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    detailsPressed(i) {
      this.currPkgIdx = i;
      this.dialog2 = true;
      console.log(this.currPkgIdx);
    },

    resetPressed() {
      this.$refs.form.reset();
      // console.log(this.nameList);
    },

    submitPressed() {
      // console.log("submit pressed");
      let newPkg = {
        name: this.packageName,
        package_type: 0,
        bandwidth: this.bandwidth,
        up_speed: this.upSpeed,
        down_speed: this.downSpeed,
        duration: this.duration,
        price: this.price,
        ongoing: true,
        isRealIp: true,
        downTime: this.downtime,
        responseTime: this.responseTime,
        areas: this.areas,
      };
      axios
        .post("/api/package/insert", newPkg)
        .then((res) => {
          if (res.status === 201) {
            this.dialog = false;

            this.allPkgs.push(newPkg);
            this.pkgs = this.allPkgs;
            this.nameList.push(newPkg.name);
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
      console.log(minPrice, maxPrice);
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
    },
  },
};
</script>
