<template>
  <div class="container">
    <HeaderView />
    <div class="row">
      <div class="col-4" v-for="i in 10" :key=i>
        <CardView />
      </div>
    </div>
  </div>
</template>

<script setup>
  import HeaderView from "@/components/HeaderView.vue";
  import CardView from "@/components/CardView.vue";
</script>

<style lang="scss">
  $primary-color: #D16BA5;
  $secondary-color: #86A8E7;
  $third-color: #5FFBF1;
</style>
