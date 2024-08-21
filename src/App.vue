<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <header>
      <nav class="nav py-3">
        <RouterLink to="/" class="nav-link fs-4">Home</RouterLink>
        <RouterLink to="/ex1" class="nav-link fs-4">Ex1</RouterLink>
        <RouterLink to="/ex2" class="nav-link fs-4">Ex2</RouterLink>
        <RouterLink to="/ex3" class="nav-link fs-4">Ex3</RouterLink>
      </nav>
    </header>
    
    <main>
      <div class="p-3">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
  .nav {
    /* font-family: "New Amsterdam", sans-serif; */
  }
</style>
