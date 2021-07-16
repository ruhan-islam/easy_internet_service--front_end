<template>
  <div id="show-blogs">
    <h1>All Blog Articles</h1>
    <button type="button" class="btn btn-primary">Primary</button>
    <input type="text" v-model="search" placeholder="search blogs" />
    <div v-for="blog in blogs" :key="blog.isp_id" class="single-blog">
      <router-link v-bind:to="'/blog/' + blog.isp_id"
        ><h2>{{ blog.isp_id }}</h2></router-link
      >
      <article>{{ blog.gateway }}</article>
    </div>
  </div>
</template>

<script>
// Imports
import axios from "axios";
import searchMixin from "../mixins/searchMixin";

export default {
  data() {
    return {
      blogs: [],
      search: "",
    };
  },
  created() {
    axios
      .get("/api/payment/fetch")
      .then((res) => {
        this.blogs = res.data.data.slice(0, 10);
      })
      .catch((err) => {
        console.log(err);
      });
    // this.$http
    //   .get("http://localhost:3000/api/payment/fetch")
    //   .then((res) => {
    //     this.blogs = res.body.data.slice(0, 10);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  mixins: [searchMixin],
};
</script>

<style>
#show-blogs {
  max-width: 800px;
  margin: 0px auto;
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
}

#show-blogs a {
  color: #444;
  text-decoration: none;
}
</style>
