<template>
  <v-row class="d-flex justify-space-around ga-1">
    <v-col v-for="item in items" :key="item.goodsId">
      <WishCard :item="item" @click="$router.push(`/goods/${item.goodsId}`)" />
    </v-col>
  </v-row>
</template>

<script setup>
import WishCard from '@/components/wish/WishCard.vue'

const props = defineProps({
  items: {
    type: Array,
  },
})
</script>

<style lang="scss" scoped></style>
