<template>
  <div>
    <topbar></topbar>

    <div class="container-flow">
      <!-- contents here  -->
      <template>
        <v-card>
          <v-navigation-drawer permanent expand-on-hover>
            <v-list>
              <v-list-item class="px-2">
                <v-list-item-avatar>
                  <v-img
                    src="https://media-eng.dhakatribune.com/uploads/2013/11/BTRC-logo_14-1.jpg"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    NTTN
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Nationwide Telecommunication <br />
                    Transmission Network
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list nav dense>
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>mdi-folder</v-icon>
                </v-list-item-icon>
                <v-list-item-title>My Files</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Shared with me</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>mdi-star</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Starred</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </template>
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
    return {};
  },
  methods: {},
  computed: {},
};
</script>
