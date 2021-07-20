<template>
  <div>
    <div class="container mt-5">
      <!-- contents here  -->
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

          <v-card-actions>
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
</template>

<script>
import axios from "axios";

export default {
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

  created() {
    this.fetchUserNameList();
  },

  computed: {
    isSendDisabled() {
      return !(this.ispName && this.subject && this.details && this.valid);
    },
  },

  methods: {
    fetchUserNameList() {
      axios
        .get("/api/user/fetch")
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            //   console.log(res.data.data);
            this.userList = res.data.data;
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
        senderId: "Nttn",
        receiverID: this.ispName,
        senderType: 1,
        receiverType: 2,
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
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      setTimeout(() => {
        this.showSnackbar = false;
      }, 2000);
    },
  },
};
</script>
