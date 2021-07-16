<template>
  <div id="preferences">
    <form v-if="!submitted" class="form-group">
      <label>Price(max): </label>
      <input class="form-control" type="text" v-model.lazy="price" required />
      <br />
      <label>bandwidth (max):</label>
      <input
        class="form-control"
        type="text"
        v-model.lazy="bandwidth"
        required
      />
      <br />
      <label>duration (max):</label>
      <input
        class="form-control"
        type="text"
        v-model.lazy="duration"
        required
      />
      <br />
      <!-- <div id="checkboxes">
        <p>Blog Categories:</p>
        <label>Ninjas</label>
        <input type="checkbox" value="ninjas" v-model="blog.categories" />
        <label>Wizards</label>
        <input type="checkbox" value="wizards" v-model="blog.categories" />
        <label>Mario</label>
        <input type="checkbox" value="mario" v-model="blog.categories" />
        <label>Cheese</label>
        <input type="checkbox" value="cheese" v-model="blog.categories" />
      </div>
      <label>Author:</label>
      <select v-model="blog.author">
        <option v-for="author in authors" :key="author">{{ author }}</option>
      </select>
      <hr /> -->
      <button class="btn btn-primary" @click.prevent="suggest">Submit</button>
    </form>
    <form v-if="submitted">
      <select class="custom-select col-md-3 mb-5" name="sort" id="sort">
        <option value="byP">price</option>
        <option value="byB">bandwidth</option>
        <option value="byD">duration</option>
      </select>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">bandwidth</th>
            <th scope="col">duration</th>
            <th scope="col">price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pkg, i) in pkgs" :key="i">
            <td>{{ pkg.name }}</td>
            <td>{{ pkg.bandwidth }}</td>
            <td>{{ pkg.duration }}</td>
            <td>{{ pkg.price }}</td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
// Imports
import axios from "axios";

export default {
  data() {
    return {
      price: 0,
      bandwidth: 0,
      duration: 0,
      pkgs: [],
      submitted: false,
    };
  },
  methods: {
    suggest() {
      this.submitted = !this.submitted;
      this.price = parseInt(this.price, 10);
      this.bw = parseInt(this.bw, 10);
      this.duration = parseInt(this.duration, 10);
      axios
        .get("/api/package/fetch")
        .then((res) => {
          let allPkgs = res.data.data;
          for (let pkg in allPkgs) {
            if (
              allPkgs[pkg].price <= this.price &&
              allPkgs[pkg].bandwidth <= this.bandwidth &&
              allPkgs[pkg].duration <= this.duration
            ) {
              this.pkgs.push(allPkgs[pkg]);
            }
          }
          console.log(this.pkgs);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#preferences {
  max-width: 800px;
  margin: 0px auto;
}

#preferences a {
  color: #444;
  text-decoration: none;
}
</style>
