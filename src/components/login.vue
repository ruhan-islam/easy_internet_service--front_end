<template>
  <div class="container" style="padding:15% 30%">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select v-model="type" :items="items" label="Login As" solo></v-select>

      <v-text-field
        v-model="username"
        :rules="nameRules"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        autocomplete="on"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        label="Password"
        hint="At least 6 characters"
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-checkbox v-model="checkbox" label="Remember me"></v-checkbox>

      <v-btn
        :disabled="!valid || password === '' || type === ''"
        color="success"
        @click="validateLogin"
      >
        Login
      </v-btn>
      <label v-show="error" class="red--text">
        invalid username or password, try again
      </label>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";

export default {
  data: () => ({
    ...mapMutations(["setLoggedIn", "setAuthToken", "setUserName"]),
    ...mapGetters(["getUserName"]),
    valid: false,
    username: "",
    password: "",
    error: false,
    items: ["NTTN", "ISP", "USER"],
    checkbox: true,
    type: "",

    nameRules: [
      (v) => !!v || "username is required",
      (v) =>
        (v && v.length <= 10) || "usernameame must be less than 10 characters",
    ],

    show1: false,
    rules: {
      required: (value) => !!value || "password is required.",
      min: (v) => v.length >= 6 || "Min 6 characters",
    },
  }),

  methods: {
    validateLogin() {
      axios
        .post("/api/isp/login", {
          name: this.username,
          password: this.password,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 201) {
            this.setLoggedIn();
            this.setAuthToken(res.data.token);
            this.setUserName(this.username);
            this.$router.push("/NTTN/home");
          } else if (res.status === 203) {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.valid = false;
    // if (!this.isLoggedIn) {
    //     this.$router.push("login");
    // }
  },

  created() {
    this.show = true;
  },
};
</script>

<style></style>
