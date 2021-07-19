<template>
  <div>
    <topbar></topbar>

    <div class="container mt-5">
      <!-- contents here  -->

      <template>
        <v-row justify="center">
          <v-expansion-panels v-model="panel" inset>
            <v-expansion-panel
              v-for="(notification, i) in allNotifications"
              :key="i"
            >
              <v-expansion-panel-header
                @click="expandClicked(i)"
                disable-icon-rotate
              >
                {{ notification.subject }} &nbsp;
                <small>
                  {{ notification.notificationArrivalTime.slice(0, 10) }}
                  @ {{ notification.notificationArrivalTime.slice(11, 19) }}
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

    <bottombar class="ma-12"></bottombar>
  </div>
</template>

<script>
import topbar from "./topbar.vue";
import bottombar from "./bottombar.vue";
import axios from "axios";

export default {
  components: { topbar, bottombar },

  data() {
    return {
      panel: "",
      allNotifications: [],
    };
  },

  methods: {
    expandClicked(i) {
      // console.log(this.allNotifications[i]._id);
      // if (!this.allNotifications[i].seenStatus) {
      //   this.allNotifications[i].seenStatus = true;
      // }

      if (!this.allNotifications[i].seenStatus) {
        axios
          .post("/api/notification/updateSeenStatus", {
            id: this.allNotifications[i]._id,
          })
          .then((res) => {
            // console.log(res);
            if (res.status === 200) {
              this.allNotifications[i].seenStatus = true;
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

  computed: {},

  created() {
    axios
      .post("/api/notification/fetchByQuery", {
        receiverID: "Nttn",
        receiverType: 1, // for NTTN
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          this.allNotifications = res.data.data;
          // console.log(this.allNotifications);
          // for (let i in this.allNotifications) {
          //   let today = new Date(
          //     this.allNotifications[i].notificationArrivalTime
          //   );
          //   today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
          //   this.allNotifications[i].notificationArrivalTime = today;
          // }
        } else {
          this.error = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
