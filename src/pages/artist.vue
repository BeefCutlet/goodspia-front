<template>
  <div class="d-flex ga-5">
    <ArtistMenu />
    <router-view />
  </div>
</template>

<script setup>
import ArtistMenu from '@/components/artist/ArtistMenu.vue'
</script>

<style lang="scss" scoped></style>
