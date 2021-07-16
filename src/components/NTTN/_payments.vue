<template>
  <div>
    <topbar></topbar>

    <div class="container mt-5">
      <!-- contents here  -->
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="page = 1"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Open Dialog
            </v-btn>
          </template>

          <v-card v-show="page === 1">
            <v-card-title class="text-h5">
              page 1
            </v-card-title>
            <v-card-text> contents 1 </v-card-text>
            <v-card-actions>
              <!-- <v-spacer></v-spacer> -->
              <v-btn color="green darken-1" text @click="dialog = false">
                close
              </v-btn>
              <v-btn color="green darken-1" text @click="page++">
                proceed
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card v-show="page === 2">
            <v-card-title class="text-h5">
              page 2
            </v-card-title>
            <v-card-text> contents 2 </v-card-text>
            <v-card-actions>
              <!-- <v-spacer></v-spacer> -->
              <v-btn color="green darken-1" text @click="page--">
                back
              </v-btn>
              <v-btn color="green darken-1" text @click="page++">
                proceed
              </v-btn>
            </v-card-actions>
          </v-card>

          <!-- final page -->
          <v-card v-show="page === 3">
            <v-card-title class="text-h5">
              page 3
            </v-card-title>
            <v-card-text> contents 3 </v-card-text>
            <v-card-actions>
              <!-- <v-spacer></v-spacer> -->
              <v-btn color="green darken-1" text @click="page--">
                back
              </v-btn>
              <v-btn
                router-link
                to="/NTTN/home"
                exact
                color="green darken-1"
                text
                @click="dialog = false"
              >
                submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

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
      page: 0,
      dialog: false,
    };
  },
  methods: {},
  computed: {},
};
</script>
