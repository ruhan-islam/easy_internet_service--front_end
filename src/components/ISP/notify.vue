<template>
  <div>
    <topbar></topbar>

    <div class="ma-12 mb-12 container-flow">
      <!-- contents here  -->
      <div class="container" justify-center>
        <v-form ref="form" v-model="valid" lazy-validation>
          <div style="width:80%">
            <v-text-field
              v-model="userName"
              :rules="userNameRules"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="subject"
              :rules="subjectRules"
              label="Subject"
              required
            ></v-text-field>
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
              Notification Sent
            </v-snackbar>
          </div>
        </v-form>
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
  components: {
    topbar,
    bottombar,
  },

  data() {
    return {
      valid: false,

      userList: [],
      userNameList: [],
      userName: "",
      userNameRules: [
        (v) => !!v || "Name is required",
        (v) =>
          !(v && !this.userNameList.includes(v.trim())) || "user not found",
      ],

      subject: "",
      subjectRules: [(v) => !!v || "Subject is required"],

      details: "",
      detailsRules: [(v) => !!v || "Details is required"],

      showSnackbar: false,
    };
  },

  mounted() {
    this.fetchUserNameList();
  },

  computed: {
    ...mapGetters([
      // "getAuthToken",
      // "getNtfCount",
      "getUserID",
      "getUserData",
    ]),

    isSendDisabled() {
      return !(this.userName && this.subject && this.details && this.valid);
    },
  },

  methods: {
    ...mapMutations([
      // "setNtfCount",
    ]),

    fetchUserNameList() {
      axios
        .post("/api/user/fetchUserOfIspByQuery", {
          id: this.getUserID,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            // console.log(res.data);
            this.userList = res.data;
            this.userNameList = [];
            for (let i in this.userList) {
              this.userNameList.push(this.userList[i].name);
            }
            // console.log(this.userNameList);
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

      let newNotification = {
        senderId: this.getUserData.name,
        receiverID: this.userName,
        senderType: 2,
        receiverType: 3,
        subject: this.subject,
        details: this.details,
        category: "",
      };

      // console.log(newNotification);

      axios
        .post("/api/notification/insert", newNotification)
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
  },
};
</script>
