<template>
  <div>
    <topbar></topbar>

    <div class="ma-12 mb-12 container-flow">
      <!-- contents here  -->
      <v-card style="margin:0% 0% 20% 0%">
        <v-toolbar flat dark>
          <v-toolbar-title> Manage Tickets </v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
          <v-tab>
            <v-icon left>
              mdi-ticket-outline
            </v-icon>
            Create Ticket
          </v-tab>

          <!-- <v-tab :disabled="true"> -->
          <v-tab @click="fetchOwnTickets">
            <v-icon left>
              mdi-ticket-confirmation
            </v-icon>
            Ticket History
          </v-tab>

          <!-- send tickets -->
          <v-tab-item>
            <div class="container" justify-center>
              <v-form ref="form" v-model="valid" lazy-validation>
                <div style="width:80%">
                  <v-select
                    v-model="category"
                    :items="categories"
                    label="Category"
                    solo
                  ></v-select>

                  <v-textarea
                    color="teal"
                    v-model="details"
                    :rules="detailsRules"
                    label="Details"
                    required
                  >
                  </v-textarea>

                  <v-card-actions class="justify-center">
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
                    Ticket Sent
                  </v-snackbar>
                </div>
              </v-form>
            </div>
          </v-tab-item>

          <v-tab-item>
            <!-- loading own payments -->
            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="searchOwn"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :loading="isLoadingOwn"
                loading-text="Loading... Please wait"
                :headers="headersOwn"
                :items="itemsOwn"
                :search="searchOwn"
              >
                <template v-slot:[`item.resolveStatus`]="{ item }">
                  <v-simple-checkbox
                    v-model="item.resolveStatus"
                    disabled
                  ></v-simple-checkbox>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
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
      valid: false,

      details: "",
      detailsRules: [(v) => !!v || "Details is required"],

      showSnackbar: false,
      userTickets: [],
      myTickets: [],

      category: "",
      categories: [
        "Speed Problems",
        "Network Problems",
        "Billing Problems",
        "others",
      ],

      isLoadingOwn: true,
      searchOwn: "",
      headersOwn: [
        { text: "Category", value: "category" },
        { text: "Details", value: "details" },
        { text: "Resolved", value: "resolveStatus" },
        { text: "Sending Time", value: "arrivalTime" },
      ],
      itemsOwn: [
        // {
        //   ispName: "Frozen Yogurt",
        //   packageName: 159,
        //   amount: 6.0,
        //   method: 24,
        //   trxID: "1%",
        //   payTime: "1%",
        // },
      ],

      isLoadingUsers: true,
      allUserTickets: [],
      selectedUserTickets: [],
    };
  },

  mounted() {
    this.fetchOwnTickets();
    this.isLoadingOwn = true;
    this.isLoadingUsers = true;
  },

  computed: {
    ...mapGetters([
      // "getAuthToken",
      // "getNtfCount",
      "getUserID",
      "getUserData",
    ]),

    isSendDisabled() {
      return !(this.category && this.details && this.valid);
    },
  },

  methods: {
    ...mapMutations([
      // "setNtfCount",
    ]),

    fetchOwnTickets() {
      this.isLoadingOwn = true;
      axios
        .post("/api/ticket/fetchBySender", {
          senderType: 3,
          senderId: this.getUserData.name,
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data.data);
            this.itemsOwn = res.data.data;
            // console.log(this.itemsOwn);
            for (let i in this.itemsOwn) {
              this.itemsOwn[i].arrivalTime = new Date(
                this.itemsOwn[i].arrivalTime
              );
              this.itemsOwn[i].arrivalTime = this.itemsOwn[i].arrivalTime
                .toString()
                .slice(0, 24);
            }
            this.isLoadingOwn = false;
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    sendPressed() {
      // console.log("send pressed");

      let newTicket = {
        senderId: this.getUserData.name,
        receiverId: this.getUserData.ispId,
        senderType: 3,
        receiverType: 2,
        category: this.category,
        details: this.details,
        arrivalTime: new Date(),
      };

      axios
        .post("/api/ticket/insert", newTicket)
        .then((res) => {
          // console.log(res);
          if (res.status === 201) {
            this.$refs.form.reset();
            this.showSnackbar = true;
            setTimeout(() => {
              this.showSnackbar = false;
            }, 2000);
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    expandClicked(i) {
      if (!this.selectedUserTickets[i].seenStatus) {
        axios
          .post("/api/tiket/updateSeenStatus", {
            id: this.selectedUserTickets[i]._id,
          })
          .then((res) => {
            // console.log(res);
            if (res.status === 200) {
              this.selectedUserTickets[i].seenStatus = true;
              this.decTktCount(true);
            } else {
              this.error = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
