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
import { mapMutations } from "vuex";
import topbar from "./topbar.vue";
import bottombar from "./bottombar.vue";

export default {
  components: { topbar, bottombar },

  data() {
    return {
      panel: "",
      allNotifications: [],
    };
  },

  created() {
    this.fetchNotifications();
  },

  updated() {
    this.fetchNotifications();
  },

  methods: {
    ...mapMutations(["decNtfCount"]),

    fetchNotifications() {
      axios
        .post("/api/notification/fetchByQuery", {
          receiverID: "Nttn",
          receiverType: 1, // for NTTN
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
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    expandClicked(i) {
      if (!this.allNotifications[i].seenStatus) {
        axios
          .post("/api/notification/updateSeenStatus", {
            id: this.allNotifications[i]._id,
          })
          .then((res) => {
            // console.log(res);
            if (res.status === 200) {
              this.allNotifications[i].seenStatus = true;
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
