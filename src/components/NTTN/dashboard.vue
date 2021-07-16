<template>
  <div>
    <topbar></topbar>

    <div class="container-flow">
      <!-- contents here  -->
      <template>
        <v-row>
          <v-col cols="2">
            <v-card>
              <v-navigation-drawer>
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
                        NTTN
                      </v-list-item-title>
                      <!-- <v-list-item-subtitle>
                        Nationwide Telecommunication <br />
                        Transmission Network
                      </v-list-item-subtitle> -->
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list nav dense>
                  <v-list-item link @click="pageInfo = 'offers'">
                    <v-list-item-icon>
                      <v-icon>mdi-folder</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      Offers
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="pageInfo = 'tickets'">
                    <v-list-item-icon>
                      <v-icon>mdi-account-multiple</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> Tickets </v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="pageInfo = 'stats'">
                    <v-list-item-icon>
                      <v-icon>mdi-star</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> Statistics </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </v-col>

          <v-col v-show="pageInfo === 'offers'">
            <v-row justify="center">
              <v-dialog v-model="dialog" persistent max-width="80%">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn mb-5 color="primary" dark v-bind="attrs" v-on="on">
                    Create new Offer
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h5">
                    New Offer
                  </v-card-title>

                  <v-card-text>
                    <template>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="offerName"
                              :counter="nameLen"
                              :rules="nameRules"
                              label="Offer Name"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-menu
                              :close-on-content-click="false"
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
                                range
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="12" sm="6"> </v-col>
                        </v-row>

                        <v-row>
                          <v-col>
                            <v-slider
                              v-model="reduction"
                              :min="1"
                              :max="100"
                              label="Reduction (%)"
                              thumb-label="always"
                            >
                            </v-slider>
                          </v-col>

                          <v-col> </v-col>
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

            <v-row>
              <div class="col-lg-4" v-for="(offer, i) in allOffers" :key="i">
                <v-badge
                  :content="0"
                  :value="0"
                  color="red"
                  overlap
                  icon="mdi-home"
                >
                  <v-card>
                    <v-img height="250" src="./../../assets/images.jpg"></v-img>

                    <v-card-title> {{ offer.name }} </v-card-title>

                    <v-card-text>
                      <div class="my-4 text-subtitle-1">
                        {{ offer.reducePrice }}
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
          </v-col>
        </v-row>
      </template>
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

      offerName: "",
      nameLen: 20,
      nameList: [],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) =>
          !(v && this.nameList.includes(v.trim())) || "Name already in use",
        (v) =>
          (v && v.length <= this.nameLen) ||
          `Name must be less than ${this.nameLen} characters`,
      ],

      reduction: "",
      dialog: false,
      pageInfo: "",
      allOffers: [],
      currDate: "",
      dates: [],
      dateRules: [
        (v) => !!v || "Date is required",
        (v) => (v && v.length > 1) || "Must select two dates",
      ],
    };
  },

  created() {
    axios
      .get("/api/offer/fetch")
      .then((res) => {
        console.log(res.data.Data.data);
        this.allOffers = res.data.Data.data;
        // this.pkgs = this.allPkgs;
        this.nameList = [];
        for (let i in this.allOffers) {
          this.nameList.push(this.allOffers[i].name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  computed: {
    dateRangeText() {
      return this.dates.length === 2 ? this.dates.join(" ~ ") : "";
    },
    isSubmitDisabled() {
      return !(this.valid && this.offerName && this.dates.length === 2);
    },

    isResetDisabled() {
      return !(this.offerName || this.reduction > 1 || this.dates.length > 0);
    },
  },

  methods: {
    resetPressed() {
      this.$refs.form.reset();
      console.log(this.dates);
    },
    submitPressed() {
      console.log("submit pressed");
    },

    getToday() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0");
      today = today.getFullYear() + "-" + mm + "-" + dd;
      console.log(today);
      return today;
    },
  },
};
</script>
