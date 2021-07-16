<template>
  <div>
    <headerr></headerr>
    <v-container fluid>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="6">
          <label>Price: {{ pkg.price }}</label>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            v-model="gateway"
            :items="methods"
            label="Select Gateway"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="6">
          <v-text-field
            type="number"
            v-if="gateway === 'bKash'"
            label="bKash Number"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
          <v-text-field
            type="number"
            v-if="gateway === 'Rocket'"
            label="Rocket Number"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
          <v-text-field
            type="number"
            v-if="gateway === 'Nagad'"
            label="Nagad Number"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
          <v-text-field
            type="number"
            v-if="gateway === 'VISA'"
            label="VISA card Number"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
          <v-text-field
            type="number"
            v-if="gateway === 'MasterCard'"
            label="MasterCard Number"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="gateway !== ''" align="right">
        <v-col class="d-flex" cols="12" sm="6">
          <v-btn @click="sendOTP" depressed color="primary">
            Send OTP
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="showOTP" align="right">
        <v-col class="d-flex" cols="12" sm="6">
          <v-text-field
            type="number"
            label="OTP"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="showOTP" align="right">
        <v-col class="d-flex" cols="12" sm="6">
          <v-btn @click="verifyOTP" depressed color="primary">
            Verify OTP
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="showPassword" align="right">
        <v-col class="d-flex" cols="12" sm="6">
          <v-text-field
            type="password"
            label="Password"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="showPassword" align="right">
        <v-col class="d-flex" cols="12" sm="6">
          <v-btn @click="confirm" depressed color="primary">
            Confirm
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import headerr from "./header.vue";
import { mapGetters } from "vuex";

export default {
  components: { headerr },
  data() {
    return {
      methods: ["bKash", "Nagad", "Rocket", "MasterCard", "VISA"],
      gateway: "",
      pkg: "",
      showOTP: false,
      showPassword: false,
    };
  },
  methods: {
    confirm() {
      this.$router.push("payDone");
    },
    sendOTP() {
      this.showOTP = true;
    },
    verifyOTP() {
      this.showPassword = true;
    },
  },
  watch: {
    gateway() {
      console.log(this.gateway);
      this.showOTP = false;
      this.showPassword = false;
    },
  },
  computed: {
    ...mapGetters(["getSelectedPackage"]),
  },
  mounted() {
    this.pkg = this.getSelectedPackage;
    if (this.pkg != "") {
      this.show = false;
    }
    console.log(this.pkg);
  },
};
</script>
