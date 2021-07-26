<template>
  <div>
    <div class="container mt-5">
      <!-- contents here  -->
      <v-row justify="center">
        past payments dekhano lagbe
        <v-dialog v-model="dialog" persistent max-width="40%">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="pageInfo = 'paymentHighlights'"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Pay Bill
            </v-btn>
          </template>

          <v-card v-show="pageInfo === 'paymentHighlights'">
            <v-card-title class="text-h6" style="background-color: #eeeeee">
              BILLING HIGHLIGHTS
            </v-card-title>
            <v-form ref="form01" v-model="valid" lazy-validation>
              <v-card-text>
                <v-simple-table light>
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td>ISP Name:</td>
                        <td>
                          <strong> {{ userData.name }} </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Package Name:</td>
                        <td>
                          <strong> {{ pkgData.name }} </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Package Bill:</td>
                        <td>
                          <strong> {{ pkgData.price }} Taka </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Available Balance:</td>
                        <td>
                          <strong> {{ userData.balance }} Taka </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Bill Due Date:</td>
                        <td>
                          <strong>
                            {{ userData.expirationTime.slice(0, 10) }}
                          </strong>
                        </td>
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
                  @click="pageInfo = 'paymentOptions'"
                >
                  proceed
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>

          <v-card v-show="pageInfo === 'paymentOptions'">
            <v-card-title
              class="text-h6"
              style="background-color: #334257; color: white"
            >
              Pay BDT {{ amount }} with Debit / Credit Cards<br />
              ( Local / International )
            </v-card-title>
            <v-form ref="form02" v-model="validOption" lazy-validation>
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
                <v-btn
                  color="green darken-1"
                  text
                  @click="pageInfo = 'paymentHighlights'"
                >
                  back
                </v-btn>
                <!-- <v-btn
                :disabled="isPayDisabled"
                color="green darken-1"
                text
                @click="pageInfo = paymentPage"
              >
                proceed
              </v-btn> -->
              </v-card-actions>
            </v-form>
          </v-card>

          <!-- visaStart -->
          <v-card v-show="pageInfo === 'visaStart'">
            <v-card-title class="text-h6" style="background-color: #eeeeee">
              Enter Card Information
            </v-card-title>
            <v-form ref="form03" v-model="validVisa" lazy-validation>
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
                <v-btn
                  :disabled="true"
                  color="green darken-1"
                  text
                  @click="pageInfo = 'paymentOptions'"
                >
                  back
                </v-btn>
                <v-btn
                  :disabled="isVisaProceedDisabled"
                  color="green darken-1"
                  text
                  @click="pageInfo = 'visaOTP'"
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

          <!-- visaOTP -->
          <v-card v-show="pageInfo === 'visaOTP'">
            <v-card-title class="text-h6" style="background-color: #eeeeee">
              {{ cardTitle }}
            </v-card-title>
            <v-form ref="form04" v-model="validVisaOTP" lazy-validation>
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
                <v-btn
                  color="green darken-1"
                  text
                  @click="pageInfo = 'visaStart'"
                >
                  back
                </v-btn>
                <v-btn
                  :disabled="isVisaOTPDisabled"
                  color="green darken-1"
                  text
                  @click="paymentDone"
                >
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>

          <!-- bkashStart -->
          <v-card
            style="background-color: white"
            v-show="pageInfo === 'bkashStart'"
          >
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
              <v-form ref="form05" v-model="validBkashNo" lazy-validation>
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
                    <v-btn
                      :disabled="true"
                      text
                      width="100%"
                      @click="pageInfo = 'paymentOptions'"
                      >back</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="accntnumber === '' || !validBkashNo"
                      text
                      width="100%"
                      @click="pageInfo = 'bkashOTP'"
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

          <!-- bkashOTP -->
          <v-card
            style="background-color: white"
            v-show="pageInfo === 'bkashOTP'"
          >
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

              <v-form ref="form06" v-model="validOTPNo" lazy-validation>
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
                    <v-btn text width="100%" @click="pageInfo = 'bkashStart'"
                      >back</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="otpnumber === '' || !validOTPNo"
                      text
                      width="100%"
                      @click="pageInfo = 'bkashPIN'"
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

          <!-- bkashPIN -->
          <v-card
            style="background-color: white"
            v-show="pageInfo === 'bkashPIN'"
          >
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

              <v-form ref="form07" v-model="validPINNo" lazy-validation>
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
                    <v-btn text width="100%" @click="pageInfo = 'bkashOTP'"
                      >back</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="pin === '' || !validPINNo"
                      text
                      width="100%"
                      @click="paymentDone"
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

          <!-- nagadStart -->
          <v-card
            style="background-color: #8E1417"
            v-show="pageInfo === 'nagadStart'"
          >
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
              <v-form ref="form08" v-model="validNagadNo" lazy-validation>
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
                    <v-checkbox
                      v-model="tcNagad"
                      label="I agree to the terms and conditions"
                    >
                    </v-checkbox>
                  </v-row>
                </div>

                <v-row style="padding:0% 5%">
                  <v-col>
                    <v-btn
                      :disabled="true"
                      width="50%"
                      @click="pageInfo = 'paymentOptions'"
                      >back</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="
                        accntnumber === '' || !validNagadNo || !tcNagad
                      "
                      width="50%"
                      @click="pageInfo = 'nagadOTP'"
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

          <!-- nagadOTP -->
          <v-card
            style="background-color: #8E1417"
            v-show="pageInfo === 'nagadOTP'"
          >
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
              <v-form ref="form09" v-model="validNagadOTP" lazy-validation>
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
                    <v-btn width="50%" @click="pageInfo = 'nagadStart'"
                      >back</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="otpnumber === '' || !validNagadOTP"
                      width="50%"
                      @click="pageInfo = 'nagadPIN'"
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

          <!-- nagadPIN -->
          <v-card
            style="background-color: #8E1417"
            v-show="pageInfo === 'nagadPIN'"
          >
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
              <v-form ref="form10" v-model="validNagadPIN" lazy-validation>
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
                    <v-btn width="50%" @click="pageInfo = 'nagadOTP'"
                      >back</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="pin === '' || !validNagadPIN"
                      width="50%"
                      @click="paymentDone"
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

          <!-- rocketStart -->
          <v-card
            style="background-color: #790280"
            v-show="pageInfo === 'rocketStart'"
          >
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
              <v-form ref="form11" v-model="validNagadNo" lazy-validation>
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
                    <v-checkbox
                      v-model="tcRocket"
                      label="I agree to the terms and conditions"
                    >
                    </v-checkbox>
                  </v-row>
                </div>

                <v-row style="padding:0% 10%">
                  <v-col>
                    <v-btn
                      :disabled="true"
                      width="50%"
                      @click="pageInfo = 'paymentOptions'"
                      >back</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="
                        accntnumber === '' || !validNagadNo || !tcRocket
                      "
                      width="50%"
                      @click="pageInfo = 'rocketOTP'"
                      >Confirm</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row><p></p></v-row>
              </v-form>
            </v-img>
          </v-card>

          <!-- rocketOTP -->
          <v-card
            style="background-color: #790280"
            v-show="pageInfo === 'rocketOTP'"
          >
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
              <v-form ref="form12" v-model="validNagadOTP" lazy-validation>
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
                    <v-btn width="50%" @click="pageInfo = 'rocketStart'"
                      >back</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="otpnumber === '' || !validNagadOTP"
                      width="50%"
                      @click="pageInfo = 'rocketPIN'"
                      >Confirm</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row><p></p></v-row>
              </v-form>
            </v-img>
          </v-card>

          <!-- rocketPIN -->
          <v-card
            style="background-color: #790280"
            v-show="pageInfo === 'rocketPIN'"
          >
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
              <v-form ref="form13" v-model="validNagadPIN" lazy-validation>
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
                    <v-btn width="50%" @click="pageInfo = 'rocketOTP'"
                      >back</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn
                      :disabled="pin === '' || !validNagadPIN"
                      width="50%"
                      @click="paymentDone"
                      >Confirm</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row><p></p></v-row>
              </v-form>
            </v-img>
          </v-card>
        </v-dialog>

        <v-snackbar :value="showSnackbar">
          Payment Successful
        </v-snackbar>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
// import topbar from "./topbar.vue";
// import bottombar from "./bottombar.vue";

export default {
  // components: { topbar, bottombar },

  props: {
    isRedirected: Boolean,
    givenPkg: Object,
    // booleanProp: Boolean,
    // stringProp: String,
    // numberProp: Number,
    // arrayProp: Array,
    // objectProp: Object,
    // callbackProp: Function,
    // contactsPromise: Promise, // or any other constructor
  },

  data() {
    return {
      userData: "",
      pkgData: "",
      amount: "",

      dialog: false,
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
      pageInfo: "",
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

      redAmountRules: [
        (v) => !!v || "Amount mustn't be empty",
        (v) => /^\d*$/.test(v) || "Amount must be valid",
        (v) =>
          parseInt(v) >= this.redPackage.price + this.userData.balance ||
          "Amount not sufficient",
      ],

      amountRules: [
        (v) => !!v || "Amount mustn't be empty",
        (v) => /^\d*$/.test(v) || "Amount must be valid",
        (v) =>
          parseInt(v) >= this.pkgData.price + this.userData.balance ||
          "Amount not sufficient",
      ],

      numberRules: [
        (v) => !!v || "card number is required",
        (v) => /^[4]{1}[456]{1}\d{14}$/.test(v) || "card number must be valid", //
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

      tcRocket: false,
      tcNagad: false,
    };
  },

  computed: {
    ...mapGetters([
      "getUserID",
      "getUserData",
      // "getAuthToken",
      // "getNtfCount",
    ]),

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

  mounted() {
    this.fetchOwnData();

    if (this.isRedirected) {
      console.log("redirected");
    } else if (!this.userData.package_id) {
      this.fetchOwnPackage();
    }
  },

  methods: {
    ...mapMutations([
      // "setNtfCount",
    ]),

    fetchOwnData() {
      axios
        .post("/api/isp/fetchOwnData", {
          id: this.getUserID,
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            this.userData = res.data;
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchOwnPackage() {
      axios
        .post("/api/isp/fetchOwnPackage", {
          package_id: this.getUserData.package_id,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            // console.log(res.data[0]);
            this.pkgData = res.data[0];
            // console.log(this.myPackage);
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    payProcess(tag) {
      if (tag === "VISA") {
        this.paymentPage = "visaStart";
        this.cardTitle = "VISA";
      } else if (tag === "MasterCard") {
        this.paymentPage = "visaStart";
        this.cardTitle = "MasterCard";
      } else if (tag === "DBBL NEXUS") {
        this.paymentPage = "visaStart";
        this.cardTitle = "DBBL NEXUS";
      } else if (tag === "bKash") {
        this.paymentPage = "bkashStart";
      } else if (tag === "ROCKET") {
        this.paymentPage = "rocketStart";
      } else if (tag === "NAGAD") {
        this.paymentPage = "nagadStart";
      }

      this.pageInfo = this.paymentPage;
    },

    paymentDone() {
      this.showSnackbar = true;
      this.dialog = false;
      this.pageInfo = "";
      setTimeout(() => {
        this.showSnackbar = false;
      }, 5000);
      this.resetValue();

      axios
        .post("/api/payment/insert", {
          user_type: 2,
          package_id: this.getUserData.package_id,
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            this.userData = res.data;
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    resetValue() {
      this.otpFlag = false;
      this.amount = "";
      this.pageInfo = "";
      this.dialog = false;
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
};
</script>
