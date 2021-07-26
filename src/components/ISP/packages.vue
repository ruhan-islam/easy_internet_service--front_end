<template>
  <div>
    <topbar></topbar>

    <div class="ma-12 mb-12 container-flow">
      <!-- loading -->
      <v-container>
        <v-dialog v-model="dialog" persistent max-width="80%">
          <template v-slot:activator="{ on, attrs }">
            <v-row>
              <v-col cols="1">
                <v-btn
                  color="deep-purple lighten-2"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  max-width="100%"
                  fab
                >
                  <v-icon>mdi-robot</v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <h5 style="margin-top:15px">Start Tour</h5>
              </v-col>
            </v-row>
          </template>

          <v-card style="padding: 30px">
            <h2>New to the system? Just start here...</h2>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <template v-slot:default="{ open }">
                      <v-row no-gutters>
                        <v-col cols="4">
                          Estimated Number of End Connections
                        </v-col>
                        <v-col cols="8" class="text--secondary">
                          <v-fade-transition leave-absolute>
                            <span v-if="open" key="0">
                              Give us an estimation to the number of your end
                              subscriber
                            </span>
                            <span v-if="key === 1 && noCon > 0">
                              {{ noCon }} end connections estimated
                            </span>
                          </v-fade-transition>
                        </v-col>
                      </v-row>
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-text-field
                      v-model="noCon"
                      :rules="noConRules"
                      label="End Connections (Number)"
                      required
                      placeholder="e.g. 10000"
                    ></v-text-field>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <template v-slot:default="{ open }">
                      <v-row no-gutters>
                        <v-col cols="4"> Your desired duration(month) </v-col>
                        <v-col cols="8" class="text--secondary">
                          <v-fade-transition leave-absolute>
                            <span v-if="open" key="0">
                              Enter your desired duration for the package
                            </span>
                            <span v-else key="1">
                              {{ duration }}
                            </span>
                          </v-fade-transition>
                        </v-col>
                      </v-row>
                    </template>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-slider
                      v-model="duration"
                      :min="minDur"
                      :step="stepDur"
                      :max="maxDur"
                      label="Duration (month)"
                      class="align-center"
                      thumb-label="always"
                      placeholder="e.g. 6"
                    >
                    </v-slider>
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
                    @click="confirmPressed"
                  >
                    Confirm
                  </v-btn>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-expansion-panels>
            </v-form>
          </v-card>
        </v-dialog>
      </v-container>

      <!-- tabs -->
      <template>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title> Manage Packages </v-toolbar-title>
          </v-toolbar>
          <v-tabs vertical>
            <v-tab>
              <v-icon left>
                mdi-package-variant-closed
              </v-icon>
              NTTN Packages
            </v-tab>

            <v-tab>
              <v-icon left>
                mdi-package-variant
              </v-icon>
              My Packages
            </v-tab>

            <!-- <v-tab :disabled="true"> -->
            <v-tab>
              <v-icon left>
                mdi-package
              </v-icon>
              User Packages
            </v-tab>

            <v-tab-item>
              <pkgNTTN></pkgNTTN>
            </v-tab-item>
            <v-tab-item>
              <pkgOwn></pkgOwn>
            </v-tab-item>
            <v-tab-item>
              <pkgUSER></pkgUSER>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </template>
    </div>

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
import pkgOwn from "./packages_own.vue";

export default {
  components: { topbar, bottombar, pkgNTTN, pkgUSER, pkgOwn },

  data() {
    return {
      valid: false,
      minDur: "",
      maxDur: "",
      stepDur: "",
      selectedOpt: "nttn",
      dialog: false,
      noCon: 0,
      duration: 0,

      noConRules: [
        (v) => !!v || "Please enter your estimated number",
        (v) => /^\d*$/.test(v) || "Number should be valid",
      ],
    };
  },

  mounted() {
    if (!this.getUserData) {
      this.fetchOwnData();
    }
  },

  computed: {
    ...mapGetters(["getUserID", "getUserData"]),

    isSubmitDisabled() {
      // return !(
      //   this.valid &&
      //   this.packageName &&
      //   this.bandwidth &&
      //   this.downSpeed &&
      //   this.upSpeed &&
      //   this.responseTime &&
      //   this.downTime &&
      //   this.price
      // );
      return true;
    },

    isResetDisabled() {
      // return !(
      //   this.packageName ||
      //   this.price ||
      //   this.bandwidth > this.minBW ||
      //   this.upSpeed > this.bandwidth ||
      //   this.downSpeed > this.bandwidth ||
      //   this.downTime > 0 ||
      //   this.responseTime > this.minRT
      // );
      return true;
    },
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

    confirmPressed() {},

    resetPressed() {},
  },
};
</script>
