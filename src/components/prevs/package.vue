<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-4" v-for="(pkg, i) in pkgs" :key="i">
          <card :name="pkg.name" :price="pkg.price"> </card>
        </div>
      </div>
    </div>
  </div>
</template>
