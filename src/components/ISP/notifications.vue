<template>
  <div>
    <topbar></topbar>

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

      <template v-if="!isLoading">
        <v-radio-group
          @click="doFilterBySeenStatus(notificationType)"
          v-model="notificationType"
          row
        >
          <v-radio label="Seen" value="onlySeens"></v-radio>
          <v-radio label="Unseen" value="onlyUnseens"></v-radio>
          <v-radio label="All" value="all"></v-radio>
        </v-radio-group>
        <v-row justify="center">
          <v-expansion-panels v-model="panel" inset>
            <v-expansion-panel
              v-for="(notification, i) in selectedNotifications"
              :key="i"
            >
              <v-expansion-panel-header
                @click="expandClicked(i)"
                disable-icon-rotate
              >
                <strong> {{ notification.subject }} </strong> &nbsp;
                <small class="text-right">
                  @
                  {{
                    notification.notificationArrivalTime.toString().slice(0, 24)
                  }}
                </small>
                <template v-if="notification.seenStatus" v-slot:actions>
                  <v-icon color="teal">
                    mdi-check
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ notification.details }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </template>
    </div>

    <bottombar></bottombar>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";
import topbar from "./topbar.vue";
import bottombar from "./bottombar.vue";

export default {
  components: { topbar, bottombar },
  data() {
    return {
      isLoading: true,
      notificationType: "",
      panel: "",
      allNotifications: [],
      selectedNotifications: [],
    };
  },

  computed: {
    ...mapGetters(["getUserID", "getUserData"]),
  },

  mounted() {
    this.isLoading = true;
    if (!this.getUserData) {
      this.fetchOwnData();
    }
    this.fetchNotifications();
  },

  updated() {
    this.fetchNotifications();
  },

  methods: {
    ...mapMutations(["setUserData", "decNtfCount"]),

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

    fetchNotifications() {
      // this.isLoading = true;
      axios
        .post("/api/notification/fetchByQuery", {
          receiverID: this.getUserData.name,
          receiverType: 2, // for ISP
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.allNotifications = res.data.data.reverse();
            // console.log(this.allNotifications);
            for (let i in this.allNotifications) {
              this.allNotifications[i].notificationArrivalTime = new Date(
                this.allNotifications[i].notificationArrivalTime
              );
            }
            this.selectedNotifications = this.allNotifications;
            if (this.isLoading) {
              this.isLoading = false;
            }
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    doFilterBySeenStatus(notificationType) {
      console.log(notificationType);
    },

    expandClicked(i) {
      if (!this.selectedNotifications[i].seenStatus) {
        axios
          .post("/api/notification/updateSeenStatus", {
            id: this.selectedNotifications[i]._id,
          })
          .then((res) => {
            // console.log(res);
            if (res.status === 200) {
              this.selectedNotifications[i].seenStatus = true;
              this.decNtfCount(true);
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
