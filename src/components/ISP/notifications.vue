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
                <!-- <small>
                  {{ notification.notificationArrivalTime.slice(0, 10) }}
                  @ {{ notification.notificationArrivalTime.slice(11, 19) }}
                </small> -->
                <small>
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

    <bottombar class="ma-12"></bottombar>
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
      panel: "",
      allNotifications: [],
    };
  },

  computed: {
    ...mapGetters(["getUserName"]),
  },

  created() {
    // console.log(this.getUserName);
    // console.log(new Date());

    axios
      .post("/api/notification/fetchByQuery", {
        receiverID: this.getUserName,
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
        } else {
          this.error = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    ...mapMutations(["decNtfCount"]),

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
              this.decNtfCount;
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
