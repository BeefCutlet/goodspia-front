<template>
  <div>
    <!-- 신규 상품 -->
    <h1 class="font-weight-bold mb-4 ml-14">신규 상품</h1>
    <GoodsCardList :items="goodsItems" />
    <v-divider class="my-10" />

    <!-- 추천 상품 -->
    <h1 class="font-weight-bold mb-4 ml-14">추천 상품</h1>
    <GoodsCardList :items="goodsItems" />
  </div>
</template>

<script setup>
import { getGoodsList } from '@/api/goods'
import GoodsCardList from '@/components/goods/GoodsCardList.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'

const goodsItems = ref([])
const getGoodsItems = async () => {
  const goodsList = await getGoodsList()
  goodsItems.value = goodsList.goodsList
}

onMounted(() => {
  getGoodsItems()
})
</script>

<style lang="scss" scoped>
.goods-items {
  width: 300px;
  height: 120px;
  background-color: #000;

  &.goods-item {
    height: 100%;
  }
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
