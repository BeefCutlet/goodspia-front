<template>
  <div class="d-flex justify-center">
    <ArtistMenu />
    <router-view />
  </div>
</template>

<script setup>
import ArtistMenu from '@/components/artist/ArtistMenu.vue'
</script>

<style lang="scss" scoped></style>
