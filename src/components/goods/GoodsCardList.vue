<template>
  <v-row class="d-flex justify-space-around ga-1">
    <v-col v-for="item in items" :key="item.goodsId" cols="3">
      <GoodsCard :item="item" @click="$router.push(`/goods/${item.goodsId}`)" />
    </v-col>
  </v-row>
</template>

<script setup>
import GoodsCard from '@/components/goods/GoodsCard.vue'

const props = defineProps({
  items: {
    type: Array,
  },
})
</script>

<style lang="scss" scoped></style>
