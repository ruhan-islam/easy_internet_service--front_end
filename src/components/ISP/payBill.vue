<template>
  <div>
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
                      label="MM/YY"
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
                          <strong>
                            **** **** **** {{ cardnumber.slice(12, 16) }}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>OTP:</td>
                        <td>
                          <v-text-field
                            v-model="otp"
                            :rules="otpRules"
                            label="one time password"
                            required
                          ></v-text-field>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <v-btn
                            :disabled="otpFlag"
                            color="deep-purple lighten-2"
                            text
                            small
                            @click="resendOTP"
                          >
                            {{ resendOTPData }}
                          </v-btn>
                        </td>
                        <!-- <br /> -->
                        <td>
                          <span v-if="otpFlag">
                            OTP Resent. Try again in {{ otpseconds }}s
                          </span>
                        </td>
                      </tr>
                    </tbody>

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

          <v-card style="background-color: white" v-show="page === 7">
            <v-img height="100%">
              <div style="text-align: center; padding: 3% 7%">
                <img
                  padding
                  src="https://raw.githubusercontent.com/Shipu/bkash-example/master/bkash_payment_logo.png"
                  width="80%"
                  alt="bkash payment"
                />
              </div>
              <hr style="border: 2px solid #ff0000; border-radius: 15px" />

              <v-row style="padding: 0% 5%">
                <v-col>
                  <strong>Amader Internet</strong>
                </v-col>
                <v-col>
                  <strong>Taka {{ amount }}</strong>
                </v-col>
              </v-row>
              <v-form ref="form" v-model="validBkashNo" lazy-validation>
                <div style="background-color: #f21170; margin: 0">
                  <p
                    style="
                      color: white;
                      text-align: center;
                      font-size: 15px;
                      padding: 10% 0%;
                    "
                  >
                    Your bKash Account number
                  </p>

                  <v-text-field
                    style="
                      margin: 0% 15%;
                      padding: 0px 15px;
                      background-color: #ffffff;
                    "
                    v-model="accntnumber"
                    :rules="accntNoRules"
                    required
                    placeholder="e.g 01XXX XXXXXX"
                  ></v-text-field>

                  <p
                    style="
                      color: white;
                      text-align: center;
                      font-size: 11px;
                      padding: 10% 0%;
                    "
                  >
                    By clicking on Confirm, you are agreeing to the
                    <a href="https://www.bkash.com/terms-of-use-checkout"
                      >terms & conditions</a
                    >
                  </p>
                </div>

                <v-row>
                  <v-col>
                    <v-btn text width="100%" @click="page = 2">back</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="accntnumber === '' || !validBkashNo"
                      text
                      width="100%"
                      @click="page = 8"
                      >Confirm</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row mb-50>
                  <v-btn mb-50 text plain width="100%" color="error"
                    ><v-icon>mdi-phone</v-icon> 16247
                  </v-btn>
                </v-row>
                <v-row><p></p></v-row>
              </v-form>
            </v-img>
          </v-card>

          <v-card style="background-color: white" v-show="page === 8">
            <v-img height="100%">
              <div style="text-align: center; padding: 3% 7%">
                <img
                  padding
                  src="https://raw.githubusercontent.com/Shipu/bkash-example/master/bkash_payment_logo.png"
                  width="80%"
                  alt="bkash payment"
                />
              </div>
              <hr style="border: 2px solid #ff0000; border-radius: 15px" />

              <v-form ref="form" v-model="validOTPNo" lazy-validation>
                <div style="background-color: #f21170; margin: 0">
                  <p
                    style="
                      color: white;
                      text-align: center;
                      font-size: 15px;
                      padding: 10% 0%;
                    "
                  >
                    Enter verification code sent to
                    {{ accntnumber.slice(0, 3) }} ** ***
                    {{ accntnumber.slice(8, 11) }}
                  </p>

                  <v-text-field
                    style="
                      margin: 0% 15%;
                      padding: 0px 15px;
                      background-color: #ffffff;
                    "
                    v-model="otpnumber"
                    :rules="otpMRules"
                    required
                    placeholder="Verification Code"
                  ></v-text-field>

                  <p
                    style="
                      color: white;
                      text-align: center;
                      font-size: 11px;
                      padding: 10% 0%;
                    "
                  >
                    Didn't receive code?
                    <strong
                      style="text-decoration:underline"
                      @click="resendTextSet"
                      >Resend code</strong
                    >
                    <br /><strong>{{ resendText }}</strong>
                  </p>
                </div>

                <v-row>
                  <v-col>
                    <v-btn text width="100%" @click="page = 7">back</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="otpnumber === '' || !validOTPNo"
                      text
                      width="100%"
                      @click="page = 9"
                      >Confirm</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row mb-50>
                  <v-btn mb-50 text plain width="100%" color="error"
                    ><v-icon>mdi-phone</v-icon> 16247
                  </v-btn>
                </v-row>
                <v-row><p></p></v-row>
              </v-form>
            </v-img>
          </v-card>

          <v-card style="background-color: white" v-show="page === 9">
            <v-img height="100%">
              <div style="text-align: center; padding: 3% 7%">
                <img
                  padding
                  src="https://raw.githubusercontent.com/Shipu/bkash-example/master/bkash_payment_logo.png"
                  width="80%"
                  alt="bkash payment"
                />
              </div>
              <hr style="border: 2px solid #ff0000; border-radius: 15px" />

              <v-form ref="form" v-model="validPINNo" lazy-validation>
                <div style="background-color: #f21170; margin: 0">
                  <p
                    style="
                      color: white;
                      text-align: center;
                      font-size: 15px;
                      padding: 10% 0% 5%;
                    "
                  >
                    Enter PIN of your bKash Account number
                    {{ accntnumber.slice(0, 3) }} ** ***
                    {{ accntnumber.slice(8, 11) }}
                  </p>

                  <v-text-field
                    style="
                      margin: 0% 15% 5%;
                      padding: 0px 15px;
                      background-color: #ffffff;
                    "
                    v-model="pin"
                    :rules="pinMRules"
                    required
                    :type="showPIN ? 'text' : 'password'"
                    placeholder="PIN Number"
                  ></v-text-field>
                  <p style="color: #f21170;">asdasdd</p>
                </div>

                <v-row>
                  <v-col>
                    <v-btn text width="100%" @click="page = 8">back</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="pin === '' || !validPINNo"
                      text
                      width="100%"
                      @click="visaDone"
                      >Confirm</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row mb-50>
                  <v-btn mb-50 text plain width="100%" color="error"
                    ><v-icon>mdi-phone</v-icon> 16247
                  </v-btn>
                </v-row>
                <v-row><p></p></v-row>
              </v-form>
            </v-img>
          </v-card>

          <v-card style="background-color: #8E1417" v-show="page === 10">
            <v-img height="100%">
              <div style="text-align: center; padding: 7%">
                <img
                  padding
                  src="../../assets/nagad.png"
                  width="80%"
                  alt="bkash payment"
                />
              </div>

              <v-row style="padding-left:15%; color:#CCCCC6">
                <v-col cols="4">
                  <strong>Total Amount:</strong>
                </v-col>
                <v-col>
                  <strong>BDT {{ amount }}</strong>
                </v-col>
              </v-row>
              <v-row style="padding-left:15%; color:#CCCCC6">
                <v-col cols="4">
                  <strong>Charge:</strong>
                </v-col>
                <v-col>
                  <strong>BDT 0</strong>
                </v-col>
              </v-row>
              <v-form ref="form" v-model="validNagadNo" lazy-validation>
                <div style=" margin: 0">
                  <p
                    style="
                      color: #CCCCC6;
                      text-align: center;
                      padding: 5% 0% 5%;
                    "
                  >
                    <strong>Your Nagad Account Number</strong>
                  </p>

                  <v-text-field
                    style="
                      margin: 0% 15%;
                      padding: 0px 15px;
                      background-color: #ffffff;
                    "
                    v-model="accntnumber"
                    :rules="accntNoRules"
                    required
                    placeholder="e.g 01XXX XXXXXX"
                  ></v-text-field>

                  <v-row style="color: #CCCCC6;padding:5% 0% 0% 10%">
                    <v-col cols="1">
                      <v-checkbox color="red darken-3"> </v-checkbox>
                    </v-col>
                    <v-col style="padding-top:5%">
                      I agree to the terms and conditions
                      <a href="https://nagad.com.bd/en/terms-of-use/"
                        ><strong>terms & conditions</strong></a
                      >
                    </v-col>
                  </v-row>
                </div>

                <v-row style="padding:0% 5%">
                  <v-col>
                    <v-btn width="50%" @click="page = 2">back</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="accntnumber === '' || !validNagadNo"
                      width="50%"
                      @click="page = 11"
                      >Confirm</v-btn
                    >
                  </v-col>
                </v-row>
                <div style="text-align: center; padding: 7%">
                  <img
                    padding
                    src="../../assets/nagad2.png"
                    width="80%"
                    alt="bkash payment"
                  />
                </div>
                <v-row><p></p></v-row>
              </v-form>
            </v-img>
          </v-card>

          <v-card style="background-color: #8E1417" v-show="page === 11">
            <v-img height="100%">
              <div style="text-align: center; padding: 7%">
                <img
                  padding
                  src="../../assets/nagad.png"
                  width="80%"
                  alt="bkash payment"
                />
              </div>

              <v-row style="padding-left:15%; color:#CCCCC6">
                <v-col cols="4">
                  <strong>Total Amount:</strong>
                </v-col>
                <v-col>
                  <strong>BDT {{ amount }}</strong>
                </v-col>
              </v-row>
              <v-row style="padding-left:15%; color:#CCCCC6">
                <v-col cols="4">
                  <strong>Charge:</strong>
                </v-col>
                <v-col>
                  <strong>BDT 0</strong>
                </v-col>
              </v-row>
              <v-form ref="form" v-model="validNagadOTP" lazy-validation>
                <div style=" margin: 0">
                  <p
                    style="
                      color: #CCCCC6;
                      text-align: center;
                      padding: 5% 0% 5%;
                    "
                  >
                    <strong
                      >Enter verification code sent to
                      {{ accntnumber.slice(0, 3) }} ** ***
                      {{ accntnumber.slice(8, 11) }}</strong
                    >
                  </p>

                  <v-text-field
                    style="
                      margin: 0% 15%;
                      padding: 0px 15px;
                      background-color: #ffffff;
                    "
                    v-model="otpnumber"
                    :rules="otpMRules"
                    required
                    placeholder="Verification Number"
                  ></v-text-field>
                </div>

                <p
                  style="
                      color: #CCCCC6;
                      text-align: center;
                      font-size: 11px;
                      padding: 4% 0%;
                    "
                >
                  Didn't receive code?
                  <strong
                    style="text-decoration:underline"
                    @click="resendTextSet"
                    >Resend code</strong
                  >
                  <br /><strong>{{ resendText }}</strong>
                </p>

                <v-row style="padding:0% 5%">
                  <v-col>
                    <v-btn width="50%" @click="page = 10">back</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="otpnumber === '' || !validNagadOTP"
                      width="50%"
                      @click="page = 12"
                      >Confirm</v-btn
                    >
                  </v-col>
                </v-row>
                <div style="text-align: center; padding: 7%">
                  <img
                    padding
                    src="../../assets/nagad2.png"
                    width="80%"
                    alt="bkash payment"
                  />
                </div>
                <v-row><p></p></v-row>
              </v-form>
            </v-img>
          </v-card>

          <v-card style="background-color: #8E1417" v-show="page === 12">
            <v-img height="100%">
              <div style="text-align: center; padding: 7%">
                <img
                  padding
                  src="../../assets/nagad.png"
                  width="80%"
                  alt="bkash payment"
                />
              </div>

              <v-row style="padding-left:15%; color:#CCCCC6">
                <v-col cols="4">
                  <strong>Total Amount:</strong>
                </v-col>
                <v-col>
                  <strong>BDT {{ amount }}</strong>
                </v-col>
              </v-row>
              <v-row style="padding-left:15%; color:#CCCCC6">
                <v-col cols="4">
                  <strong>Charge:</strong>
                </v-col>
                <v-col>
                  <strong>BDT 0</strong>
                </v-col>
              </v-row>
              <v-form ref="form" v-model="validNagadPIN" lazy-validation>
                <div style=" margin: 0">
                  <p
                    style="
                      color: #CCCCC6;
                      text-align: center;
                      padding: 5% 0% 5%;
                    "
                  >
                    <strong
                      >Enter PIN of your Nagad Account number
                      {{ accntnumber.slice(0, 3) }} ** ***
                      {{ accntnumber.slice(8, 11) }}</strong
                    >
                  </p>

                  <v-text-field
                    style="
                      margin: 0% 15%;
                      padding: 0px 15px;
                      background-color: #ffffff;
                    "
                    v-model="pin"
                    :rules="pinMRules"
                    required
                    placeholder="PIN Number"
                  ></v-text-field>
                </div>

                <v-row style="padding:10% 5% 0%">
                  <v-col>
                    <v-btn width="50%" @click="page = 11">back</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="pin === '' || !validNagadPIN"
                      width="50%"
                      @click="visaDone"
                      >Confirm</v-btn
                    >
                  </v-col>
                </v-row>
                <div style="text-align: center; padding: 7%">
                  <img
                    padding
                    src="../../assets/nagad2.png"
                    width="80%"
                    alt="bkash payment"
                  />
                </div>
                <v-row><p></p></v-row>
              </v-form>
            </v-img>
          </v-card>

          <v-card style="background-color: #790280" v-show="page === 13">
            <v-img height="100%">
              <div style="text-align: center; padding: 7%">
                <img
                  padding
                  src="https://futurestartup.com/wp-content/uploads/2016/09/DBBL-Mobile-Banking-Becomes-Rocket.jpg"
                  width="80%"
                  alt="bkash payment"
                />
              </div>

              <v-row style="padding-left:15%; color:#ffffff">
                <v-col cols="4">
                  <strong>Total Amount:</strong>
                </v-col>
                <v-col>
                  <strong>BDT {{ amount }}</strong>
                </v-col>
              </v-row>
              <v-row style="padding-left:15%; color:#ffffff">
                <v-col cols="4">
                  <strong>Charge:</strong>
                </v-col>
                <v-col>
                  <strong>BDT 0</strong>
                </v-col>
              </v-row>
              <v-form ref="form" v-model="validNagadNo" lazy-validation>
                <div style=" margin: 0">
                  <p
                    style="
                      color: #ffffff;
                      text-align: center;
                      padding: 5% 0% 5%;
                    "
                  >
                    <strong>Your Rocket Account Number</strong>
                  </p>

                  <v-text-field
                    style="
                      margin: 0% 15%;
                      padding: 0px 15px;
                      background-color: #ffffff;
                    "
                    v-model="accntnumber"
                    :rules="accntNoRules"
                    required
                    placeholder="e.g 01XXX XXXXXX"
                  ></v-text-field>

                  <v-row style="color: #ffffff;padding:5% 0% 0% 10%">
                    <v-col cols="1">
                      <v-checkbox color="red darken-3"> </v-checkbox>
                    </v-col>
                    <v-col style="padding-top:5%">
                      I agree to the terms and conditions
                      <a
                        href="https://www.dutchbanglabank.com/rocket/bill-payment.html"
                        ><strong>terms & conditions</strong></a
                      >
                    </v-col>
                  </v-row>
                </div>

                <v-row style="padding:0% 5%">
                  <v-col>
                    <v-btn width="50%" @click="page = 2">back</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="accntnumber === '' || !validNagadNo"
                      width="50%"
                      @click="page = 14"
                      >Confirm</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row><p></p></v-row>
              </v-form>
            </v-img>
          </v-card>

          <v-card style="background-color: #790280" v-show="page === 14">
            <v-img height="100%">
              <div style="text-align: center; padding: 7%">
                <img
                  padding
                  src="https://futurestartup.com/wp-content/uploads/2016/09/DBBL-Mobile-Banking-Becomes-Rocket.jpg"
                  width="80%"
                  alt="bkash payment"
                />
              </div>

              <v-row style="padding-left:15%; color:#ffffff">
                <v-col cols="4">
                  <strong>Total Amount:</strong>
                </v-col>
                <v-col>
                  <strong>BDT {{ amount }}</strong>
                </v-col>
              </v-row>
              <v-row style="padding-left:15%; color:#ffffff">
                <v-col cols="4">
                  <strong>Charge:</strong>
                </v-col>
                <v-col>
                  <strong>BDT 0</strong>
                </v-col>
              </v-row>
              <v-form ref="form" v-model="validNagadOTP" lazy-validation>
                <div style=" margin: 0">
                  <p
                    style="
                      color: #ffffff;
                      text-align: center;
                      padding: 5% 0% 5%;
                    "
                  >
                    <strong
                      >Enter verification code sent to
                      {{ accntnumber.slice(0, 3) }} ** ***
                      {{ accntnumber.slice(8, 11) }}</strong
                    >
                  </p>

                  <v-text-field
                    style="
                      margin: 0% 15%;
                      padding: 0px 15px;
                      background-color: #ffffff;
                    "
                    v-model="otpnumber"
                    :rules="otpMRules"
                    required
                    placeholder="Verification Number"
                  ></v-text-field>
                </div>

                <p
                  style="
                      color: #ffffff;
                      text-align: center;
                      font-size: 11px;
                      padding: 4% 0%;
                    "
                >
                  Didn't receive code?
                  <strong
                    style="text-decoration:underline"
                    @click="resendTextSet"
                    >Resend code</strong
                  >
                  <br /><strong>{{ resendText }}</strong>
                </p>

                <v-row style="padding:0% 5%">
                  <v-col>
                    <v-btn width="50%" @click="page = 13">back</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="otpnumber === '' || !validNagadOTP"
                      width="50%"
                      @click="page = 15"
                      >Confirm</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row><p></p></v-row>
              </v-form>
            </v-img>
          </v-card>

          <v-card style="background-color: #790280" v-show="page === 15">
            <v-img height="100%">
              <div style="text-align: center; padding: 7%">
                <img
                  padding
                  src="https://futurestartup.com/wp-content/uploads/2016/09/DBBL-Mobile-Banking-Becomes-Rocket.jpg"
                  width="80%"
                  alt="bkash payment"
                />
              </div>

              <v-row style="padding-left:15%; color:#ffffff">
                <v-col cols="4">
                  <strong>Total Amount:</strong>
                </v-col>
                <v-col>
                  <strong>BDT {{ amount }}</strong>
                </v-col>
              </v-row>
              <v-row style="padding-left:15%; color:#ffffff">
                <v-col cols="4">
                  <strong>Charge:</strong>
                </v-col>
                <v-col>
                  <strong>BDT 0</strong>
                </v-col>
              </v-row>
              <v-form ref="form" v-model="validNagadPIN" lazy-validation>
                <div style=" margin: 0">
                  <p
                    style="
                      color: #ffffff;
                      text-align: center;
                      padding: 5% 0% 5%;
                    "
                  >
                    <strong
                      >Enter PIN of your Rocket Account number
                      {{ accntnumber.slice(0, 3) }} ** ***
                      {{ accntnumber.slice(8, 11) }}</strong
                    >
                  </p>

                  <v-text-field
                    style="
                      margin: 0% 15%;
                      padding: 0px 15px;
                      background-color: #ffffff;
                    "
                    v-model="pin"
                    :rules="pinMRules"
                    required
                    placeholder="PIN Number"
                  ></v-text-field>
                </div>

                <v-row style="padding:10% 5% 0%">
                  <v-col>
                    <v-btn width="50%" @click="page = 11">back</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="pin === '' || !validNagadPIN"
                      width="50%"
                      @click="visaDone"
                      >Confirm</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row><p></p></v-row>
              </v-form>
            </v-img>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <v-snackbar :value="showSnackbar" style="margin: auto">
      Payment Successful
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardtags: ["VISA", "MasterCard", "DBBL NEXUS"],
      mobiletags: ["bKash", "ROCKET", "NAGAD"],
      valid: false,
      validOption: false,
      validVisa: false,
      validVisaOTP: false,
      validOTPNo: false,
      validPINNo: false,
      validNagadNo: false,
      validNagadOTP: false,
      validNagadPIN: false,
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
      otpnumber: "",

      paymentPage: "",

      accntnumber: "",
      resendText: "",
      pin: "",
      showPIN: false,

      validBkashNo: false,

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
        (v) =>
          (v.length >= 2 && v.slice(0, 2) > "00" && v.slice(0, 2) <= "12") ||
          "month not valid",
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

      otpMRules: [
        (v) => !!v || "OTP is required",
        (v) => /^\d{6}$/.test(v) || "OTP must be valid",
      ],

      pinMRules: [
        (v) => !!v || "PIN is required",
        (v) => /^\d{5}$/.test(v) || "PIN must be valid",
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
        this.paymentPage = 13;
      } else if (tag == "NAGAD") {
        this.paymentPage = 10;
      }
    },

    visaDone() {
      this.showSnackbar = true;
      this.dialog = false;
      this.page = 0;
      setTimeout(() => {
        this.showSnackbar = false;
      }, 10000);
      this.resetValue();
    },

    resetValue() {
      // this.valid = false;
      // this.validOption = false;
      // this.validVisa = false;
      // this.validVisaOTP = false;
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
      this.accntnumber = "";
      this.pin = "";
      this.otpnumber = "";
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

    resendTextSet() {
      this.resendText = "Code sent successfully";
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

    isBkashMobDisabled() {
      return !this.accntnumber;
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
