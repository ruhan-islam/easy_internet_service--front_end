<template>
  <div>
    <topbar></topbar>

    <div class="ma-12 mb-12 container-flow">
      <!-- contents here  -->
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :loading="isLoading"
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="items"
          :search="search"
        ></v-data-table>
      </v-card>
    </div>

    <bottombar></bottombar>
  </div>
</template>

<script>
// import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
import topbar from "./topbar.vue";
import bottombar from "./bottombar.vue";

export default {
  components: { topbar, bottombar },

  data() {
    return {
      isLoading: true,
      search: "",
      headers: [
        { text: "ISP Name", value: "senderName" },
        { text: "Package Name", value: "packageName" },
        { text: "Amount", value: "amount" },
        { text: "Payment Method", value: "method" },
        { text: "Transaction ID", value: "transaction_id" },
        { text: "Payment Time", value: "payment_time" },
      ],
      items: [
        // {
        //   ispName: "Frozen Yogurt",
        //   packageName: 159,
        //   amount: 6.0,
        //   method: 24,
        //   trxID: "1%",
        //   payTime: "1%",
        // },
      ],
    };
  },

  mounted() {
    this.fetchAllIspPayments();
  },

  methods: {
    fetchAllIspPayments() {
      this.isLoading = true;
      axios
        .post("/api/payment/fetchAllIspPayment")
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            // console.log(res.data);
            this.items = res.data.reverse();
            for (let i in this.items) {
              this.items[i].payment_time = new Date(this.items[i].payment_time);
              this.items[i].payment_time = this.items[i].payment_time
                .toString()
                .slice(0, 24);
            }
            this.isLoading = false;
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {},
};
</script>
