<template>
  <div>
    <topbar></topbar>

    <div style="padding:0px 200px 50px 200px">
      <H1 style="padding-bottom:50px">Welcome to Amader Internet</H1>
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              style="height: 500px"
              src="https://ak.picdn.net/shutterstock/videos/28588675/thumb/1.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <v-row>
                <h2>Manage your built packages and payments with ease</h2>
              </v-row>
            </div>
          </div>
          <div class="carousel-item">
            <img
              style="height: 500px"
              src="https://ak.picdn.net/shutterstock/videos/28588675/thumb/1.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <v-row>
                <v-col cols="5" style="padding-top:10%">
                  <v-card v-if="userPkgs.length > 0">
                    <v-img height="250" src="./../../assets/images.jpg"></v-img>

                    <v-card-title>
                      {{ userPkgs[0].name }}
                    </v-card-title>

                    <v-card-text>
                      <v-chip-group
                        active-class="deep-purple accent-4 white--text"
                        column
                      >
                        <v-chip>{{ userPkgs[0].bandwidth }} GBPS</v-chip>
                        <v-chip>{{ userPkgs[0].duration }} months</v-chip>
                      </v-chip-group>
                      <div>
                        {{ userPkgs[0].bandwidth }} GBPS speed relentless speed
                        of unlimited traffic with 24/7 service.
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col style="padding-top:20%">
                  <v-simple-table dark>
                    <template v-if="userPkgs.length > 0" v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Features</th>
                          <th class="text-left">Availibility</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!-- <tr v-for="item in pkgDetails" :key="item.name"> -->
                        <tr>
                          <td>Package Name</td>
                          <td>{{ userPkgs[0].name }}</td>
                        </tr>
                        <tr>
                          <td>Price (Taka)</td>
                          <td>Tk. {{ userPkgs[0].price }} /ISP</td>
                        </tr>
                        <tr>
                          <td>Bandwidth (GBPS)</td>
                          <td>{{ userPkgs[0].bandwidth }} GBPS</td>
                        </tr>
                        <tr>
                          <td>Duration (months)</td>
                          <td>{{ userPkgs[0].duration }} months</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  <v-btn
                    router-link
                    to="/ISP/packages"
                    color="white"
                    style="margin:50px 0px 0px 190px"
                  >
                    Manage Now...
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>

          <div class="carousel-item">
            <img
              style="height: 500px"
              src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <v-row>
                <v-col cols="5" style="padding-top:10%">
                  <v-card
                    v-if="allUserOffers.length > 0"
                    class="mx-auto"
                    max-width="344"
                  >
                    <v-img
                      src="./../../assets/offer.jpg"
                      height="200px"
                    ></v-img>

                    <v-card-title> {{ allUserOffers[0].name }} </v-card-title>

                    <v-card-subtitle>
                      <h2 style="color:red">
                        {{ allUserOffers[0].reduction }}% off
                      </h2>
                    </v-card-subtitle>

                    <v-expand-transition>
                      <div>
                        <v-divider></v-divider>
                      </div>
                    </v-expand-transition>
                  </v-card>
                </v-col>
                <v-col style="padding-top:20%">
                  <h3>Create, provide and manage your offers with ease</h3>
                  <v-btn
                    router-link
                    to="/ISP/offers"
                    color="white"
                    style="margin:50px 0px 0px 190px"
                  >
                    Manage Now...
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>

        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
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
    return {
      allUserPkgs: [],
      allNTTNPkgs: [],
      userPkgs: [],
      nttnPkgs: [],
      allUserOffers: [],

      thatOffer: "Shawon",
    };
  },

  mounted() {
    this.fetchOwnData();
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
            this.setUserData(res.data);
            this.fetchUserPackages();
            this.fetchUserOffers();
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchUserPackages() {
      this.isLoading = true;
      axios
        .post("/api/package/fetchByQuery", {
          packageCreator: this.getUserData.name,
        })
        .then((res) => {
          if (res.status === 200) {
            this.allUserPkgs = res.data.data;
            this.userPkgs = this.allUserPkgs;
            // this.pkgNameList = [];
            // this.markVal = 0;
            // for (let i in this.pkgs) {
            //   this.pkgNameList.push(this.allPkgs[i].name);
            // }
            // this.isLoading = false;
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchUserOffers() {
      this.isLoading = true;
      axios
        .post("/api/offer/fetchByQuery", {
          creator: this.getUserData.name,
        })
        .then((res) => {
          if (res.status === 200) {
            this.allUserOffers = res.data.data;
            // this.offerNameList = [];
            // for (let i in this.allOffers) {
            //   this.offerNameList.push(this.allOffers[i].name);
            // }
            // this.isLoading = false;
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      this.pageInfo = "offers";
    },

    detailsPressed() {},

    offerMore() {},
  },
};
</script>
