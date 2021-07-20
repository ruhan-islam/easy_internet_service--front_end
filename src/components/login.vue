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
import { mapMutations } from "vuex";

export default {
  data() {
    return {
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
          (v && v.length <= 10) ||
          "usernameame must be less than 10 characters",
      ],

      show1: false,
      rules: {
        required: (value) => !!value || "password is required.",
        min: (v) => v.length >= 6 || "Min 6 characters",
      },
    };
  },

  created() {
    this.show1 = false;
    this.valid = false;
  },

  methods: {
    ...mapMutations([
      "setLoggedIn",
      "setAuthToken",
      "setUser",
      "setUserID",
      "setUserName",
      "setUserType",
      "setUserPkgID",
    ]),

    validateLogin() {
      let api = "/api/" + this.type.toLowerCase() + "/login";
      let dest = "/" + this.type + "/home";

      axios
        .post(api, {
          name: this.username,
          password: this.password,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 201) {
            if (this.username === "nttn") {
              this.username = "Nttn";
            } else {
              this.setUserPkgID(res.data.user.package_id);
            }

            this.setAuthToken(res.data.token);
            this.setUserID(res.data.user._id);
            this.setUserType(this.type);
            this.setUserName(this.username);
            this.setLoggedIn();
            this.$router.push(dest);
            this.$router.go();
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

<style></style>
