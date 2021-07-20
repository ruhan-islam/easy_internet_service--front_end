<template>
  <div>
    <topbar></topbar>

    <div class="container mt-5">
      <!-- contents here  -->
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="30%">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="page = 1"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Pay Bill
            </v-btn>
          </template>

          <v-card v-show="page === 1">
            <v-card-title class="text-h6" style="background-color: #eeeeee">
              BILLING HIGHLIGHTS
            </v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card-text>
                <v-simple-table light>
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td>ISP Name:</td>
                        <td><strong>Kuddus</strong></td>
                      </tr>
                      <tr>
                        <td>Package Name:</td>
                        <td><strong>xxxx Unlimited</strong></td>
                      </tr>
                      <tr>
                        <td>Package Bill:</td>
                        <td><strong>xxxx Tk</strong></td>
                      </tr>
                      <tr>
                        <td>Available Balance:</td>
                        <td><strong>xxxx Tk</strong></td>
                      </tr>
                      <tr>
                        <td>Bill Due Date:</td>
                        <td><strong>xxxx</strong></td>
                      </tr>
                      <tr>
                        <td>Amount:</td>
                        <td>
                          <v-text-field
                            v-model="amount"
                            :rules="amountRules"
                            label="Price (BDT)"
                            required
                          ></v-text-field>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
              <v-card-actions>
                <v-btn color="green darken-1" text @click="dialog = false">
                  close
                </v-btn>
                <v-btn
                  :disabled="isProceedDisabled"
                  color="green darken-1"
                  text
                  @click="page++"
                >
                  proceed
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>

          <v-card v-show="page === 2">
            <v-card-title
              class="text-h6"
              style="background-color: #334257; color: white"
            >
              Pay BDT {{ amount }} with Debit / Credit Cards<br />
              ( Local / International )
            </v-card-title>
            <v-form ref="form" v-model="validOption" lazy-validation>
              <v-card-text>
                <div class="pa-4">
                  <v-chip-group active-class="primary--text" column>
                    <v-chip
                      v-for="tag in cardtags"
                      :key="tag"
                      @click="payProcess(tag)"
                    >
                      {{ tag }}
                    </v-chip>
                  </v-chip-group>
                </div>
              </v-card-text>

              <v-card-title
                class="text-h6"
                style="background-color: #334257; color: white"
              >
                Pay BDT {{ amount }} with Mobile Banking
              </v-card-title>
              <v-card-text>
                <div class="pa-4">
                  <v-chip-group active-class="primary--text" column>
                    <v-chip
                      v-for="tag in mobiletags"
                      :key="tag"
                      @click="payProcess(tag)"
                    >
                      {{ tag }}
                    </v-chip>
                  </v-chip-group>
                </div>
              </v-card-text>

              <v-card-actions>
                <!-- <v-spacer></v-spacer> -->
                <v-btn color="green darken-1" text @click="page--">
                  back
                </v-btn>
                <v-btn
                  :disabled="isPayDisabled"
                  color="green darken-1"
                  text
                  @click="page = paymentPage"
                >
                  proceed
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>

          <!-- final page -->
          <v-card v-show="page === 4">
            <v-card-title class="text-h6" style="background-color: #eeeeee">
              Enter Card Information
            </v-card-title>
            <v-form ref="form" v-model="validVisa" lazy-validation>
              <v-card-text>
                <div class="row">
                  <div class="col-lg-6">
                    <v-text-field
                      v-model="cardnumber"
                      :rules="numberRules"
                      label="CARD NUMBER"
                      required
                      placeholder="46XX XXXX XXXX XXXX"
                    ></v-text-field>
                  </div>

                  <div class="col-lg-6">
                    <v-text-field
                      v-model="month"
                      :rules="monthRules"
                      label="Month/Year"
                      required
                      placeholder="12/23"
                    ></v-text-field>
                  </div>

                  <div class="col-lg-6">
                    <v-text-field
                      v-model="holder"
                      label="CARD HOLDER"
                      required
                    ></v-text-field>
                  </div>

                  <div class="col-lg-6">
                    <v-text-field
                      type="password"
                      v-model="cvc"
                      :rules="cvcRules"
                      label="CVV2(CVC2)"
                      required
                      placeholder="XXX"
                    ></v-text-field>
                  </div>
                </div>
              </v-card-text>

              <v-card-actions>
                <!-- <v-spacer></v-spacer> -->
                <v-btn color="green darken-1" text @click="page = 2">
                  back
                </v-btn>
                <v-btn
                  :disabled="isVisaProceedDisabled"
                  color="green darken-1"
                  text
                  @click="page = 5"
                >
                  proceed
                </v-btn>
              </v-card-actions>

              <v-card-text>
                <div style="padding: 5%">
                  <strong style="color: grey">Notes:</strong>
                  <ul>
                    <li>
                      Your entered card information could not be corrupted or
                      become known to the third party, as all transmitted data
                      is encrypted by the TLS protocol.
                    </li>
                    <li>
                      For VISA, MC and NEXXUS, look at the back side of your
                      card to find 3-digit CVV2/ CVC2/ CVN2.
                    </li>
                    <li>
                      The cardholder's name should be entered just as it's
                      written on the card.
                    </li>
                  </ul>
                </div>
              </v-card-text>
            </v-form>
          </v-card>

          <v-card v-show="page === 5">
            <v-card-title class="text-h6" style="background-color: #eeeeee">
              {{ cardTitle }}
            </v-card-title>
            <v-form ref="form" v-model="validVisaOTP" lazy-validation>
              <v-card-text>
                <v-simple-table light>
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td>Merchant:</td>
                        <td><strong>Amader Internet</strong></td>
                      </tr>
                      <tr>
                        <td>Amount:</td>
                        <td>
                          <strong>BDT {{ amount }}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Date:</td>
                        <td>
                          <strong>{{ getToday }}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Card Number:</td>
                        <td>
                          <strong
                            >**** **** ****
                            {{ cardnumber.slice(12, 16) }}</strong
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>OTP:</td>
                        <td>
                          <v-text-field
                            v-model="otp"
                            :rules="otpRules"
                            label="OTP(one time password)"
                            required
                          ></v-text-field>
                        </td>
                      </tr>
                    </tbody>
                    <v-btn
                      :disabled="otpFlag"
                      color="deep-purple lighten-2"
                      text
                      small
                      @click="resendOTP"
                    >
                      {{ resendOTPData }}
                    </v-btn>
                    <span v-if="otpFlag"
                      ><br />OTP Resent. Try again in {{ otpseconds }} s</span
                    >
                    <!-- <p id="demo"></p> -->
                  </template>
                </v-simple-table>
              </v-card-text>

              <v-card-actions>
                <!-- <v-spacer></v-spacer> -->
                <v-btn color="green darken-1" text @click="page = 4">
                  back
                </v-btn>
                <v-btn
                  :disabled="isVisaOTPDisabled"
                  color="green darken-1"
                  text
                  @click="visaDone"
                >
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>

          <v-card v-show="page === 7">
            <v-card-text>
              <div>
                <img
                  padding
                  src="https://raw.githubusercontent.com/Shipu/bkash-example/master/bkash_payment_logo.png"
                  width="80%"
                  alt="bkash payment"
                />
              </div>
              <hr />

              <v-row>
                <v-col>
                  <strong>Amader Internet</strong>
                </v-col>
                <v-col>
                  <strong>Taka {{ amount }}</strong>
                </v-col>
              </v-row>

              <div>
                <p>Your bKash Account number</p>
                <v-form ref="form" v-model="validBkashNo" lazy-validation>
                  <v-text-field
                    v-model="accntnumber"
                    :rules="accntNoRules"
                    required
                  ></v-text-field>
                </v-form>
                <p>
                  By clicking on Confirm, you are agreeing to the
                  <a href="https://www.bkash.com/terms-of-use-checkout"
                    >terms & conditions</a
                  >
                </p>
              </div>

              <v-row margin:0>
                <v-col margin:0>
                  <v-btn text width="90%">Close</v-btn>
                </v-col>
                <v-col>
                  <v-btn text width="90%">Confirm</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-btn text width="90%" color="error"
                  ><v-icon>mdi-phone</v-icon> 16247
                </v-btn>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <v-snackbar :value="showSnackbar" style="margin: auto">
      Payment Successful
    </v-snackbar>

    <bottombar></bottombar>
  </div>
</template>

<script>
import topbar from "./topbar.vue";
import bottombar from "./bottombar.vue";

export default {
  components: { topbar, bottombar },
  data() {
    return {
      cardtags: ["VISA", "MasterCard", "DBBL NEXUS"],
      mobiletags: ["bKash", "ROCKET", "NAGAD"],
      valid: false,
      validOption: false,
      validVisa: false,
      validVisaOTP: false,
      otpFlag: false,
      amount: "",
      page: 0,
      dialog: false,
      resendOTPData: "Resend OTP",
      showSnackbar: false,

      holder: "",
      cvc: "",
      month: "",
      cardnumber: "",
      otp: "",
      currDate: "",
      otpseconds: 0,
      cardTitle: "",

      paymentPage: "",

      accntnumber: "",

      amountRules: [
        (v) => !!v || "Amount mustn't be empty",
        (v) => /^\d*$/.test(v) || "Amount must be valid",
      ],

      numberRules: [
        (v) => !!v || "card number is required",
        (v) => /^[4]{1}[46]{1}\d{1}$/.test(v) || "card number must be valid", //
      ],

      accntNoRules: [
        (v) => !!v || "account number is required",
        (v) => /^[0]{1}[1]{1}\d{9}$/.test(v) || "account number must be valid",
      ],

      monthRules: [
        (v) => !!v || "month/year is required",
        (v) => /^\d{2}\/\d{2}$/.test(v) || "must be given in format month/year",
      ],

      cvcRules: [
        (v) => !!v || "cvv/cvc is required",
        (v) => /^\d{3}$/.test(v) || "cvv/cvc must be valid",
      ],

      otpRules: [
        (v) => !!v || "password is required",
        (v) => /^\d{6}$/.test(v) || "password must be valid",
      ],
    };
  },
  methods: {
    payProcess(tag) {
      if (tag == "VISA") {
        this.paymentPage = 4;
        this.cardTitle = "VISA";
      } else if (tag == "MasterCard") {
        this.paymentPage = 4;
        this.cardTitle = "MasterCard";
      } else if (tag == "DBBL NEXUS") {
        this.paymentPage = 4;
        this.cardTitle = "DBBL NEXUS";
      } else if (tag == "bKash") {
        this.paymentPage = 7;
      } else if (tag == "ROCKET") {
        this.paymentPage = 7;
      } else if (tag == "NAGAD") {
        this.paymentPage = 7;
      }
    },

    visaDone() {
      this.showSnackbar = true;
      this.dialog = false;
      this.page = 0;
      setTimeout(() => {
        this.showSnackbar = false;
      }, 2000);
      this.resetValue();
    },

    resetValue() {
      this.valid = false;
      this.validOption = false;
      this.validVisa = false;
      this.validVisaOTP = false;
      this.otpFlag = false;
      this.amount = "";
      this.page = 0;
      this.dialog = false;
      this.resendOTPData = "Resend OTP";
      this.showSnackbar = false;

      this.holder = "";
      this.cvc = "";
      this.month = "";
      this.cardnumber = "";
      this.otp = "";
      this.currDate = "";
      this.otpseconds = 0;

      this.paymentPage = "";
      this.cardTitle = "";
    },

    resendOTP() {
      this.otpFlag = true;
      this.otpseconds = 5;

      let interval = setInterval(() => {
        this.otpseconds--;
        if (this.otpseconds <= 0) {
          clearInterval(interval);
          this.otpFlag = false;
          this.otpseconds = 5;
        }
      }, 1000);
    },
  },
  computed: {
    isProceedDisabled() {
      return !(this.valid && this.amount);
    },
    isPayDisabled() {
      return !(this.validOption && this.paymentPage);
    },
    isVisaProceedDisabled() {
      return !(
        this.validVisa &&
        this.holder &&
        this.cardnumber &&
        this.cvc &&
        this.month
      );
    },

    isVisaOTPDisabled() {
      return !(this.validVisaOTP && this.otp);
    },

    otpBtnFun() {
      return !this.otpFlag;
    },

    getToday() {
      let today = new Date();
      today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
      return today.toISOString().slice(0, 10);
    },
  },
};
</script>
