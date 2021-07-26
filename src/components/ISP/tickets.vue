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

          <v-tab>
            <v-icon left>
              mdi-ticket-account
            </v-icon>
            User Tickets
          </v-tab>

          <!-- <v-tab :disabled="true"> -->
          <v-tab>
            <v-icon left>
              mdi-ticket-confirmation
            </v-icon>
            Ticket History
          </v-tab>

          <!-- pay now -->
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
            <!-- loading -->
            <v-progress-linear
              v-if="isLoadingUsers"
              style="margin:10% 0"
              color="deep-purple accent-4"
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>

            <template v-if="!isLoadingUsers">
              <div style="text-align:center" v-if="!selectedUserTickets.length">
                <h2>No Ticket Found</h2>
              </div>
              <v-row justify="center">
                <v-expansion-panels v-model="panel" inset>
                  <v-expansion-panel
                    v-for="(ticket, i) in selectedUserTickets"
                    :key="i"
                  >
                    <v-expansion-panel-header
                      @click="expandClicked(i)"
                      disable-icon-rotate
                    >
                      <strong>
                        {{ ticket.category }} from {{ ticket.senderId }}
                      </strong>
                      &nbsp;
                      <small class="text-right">
                        @
                        {{ ticket.arrivalTime.toString().slice(0, 24) }}
                      </small>
                      <template v-if="ticket.seenStatus" v-slot:actions>
                        <v-icon color="teal">
                          mdi-check
                        </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      {{ ticket.details }}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
            </template>
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
              ></v-data-table>
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
    this.fetchUserTickets();
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
          senderType: 2,
          senderId: this.getUserData.name,
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data.data);
            this.itemsOwn = res.data.data;
            // console.log(this.itemsOwn);
            for (let i in this.itemsOwn) {
              this.itemsOwn[i].resolveStatus = this.itemsOwn[i].resolveStatus
                ? "Yes"
                : "No";
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

    fetchUserTickets() {
      this.isLoadingUsers = true;
      axios
        .post("/api/ticket/fetchByQuery", {
          receiverType: 2,
          receiverId: this.getUserData.name,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            // console.log(res.data.data);
            this.allUserTickets = res.data.data;
            for (let i in this.allUserTickets) {
              this.allUserTickets[i].resolveStatus = this.allUserTickets[i]
                .resolveStatus
                ? "Yes"
                : "No";
              this.allUserTickets[i].arrivalTime = new Date(
                this.allUserTickets[i].arrivalTime
              );
              this.allUserTickets[i].arrivalTime = this.allUserTickets[
                i
              ].arrivalTime
                .toString()
                .slice(0, 24);
            }
            this.selectedUserTickets = this.allUserTickets;
            this.isLoadingUsers = false;
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
        receiverId: "Nttn",
        senderType: 2,
        receiverType: 1,
        category: this.category,
        details: this.details,
        arrivalTime: new Date(),
      };

      // console.log(newNotification);

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
              // this.decNtfCount(true);
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
