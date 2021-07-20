<template>
  <div>
    <topbar></topbar>

    <div class="container mt-5">
      <!-- contents here  -->
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
