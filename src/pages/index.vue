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
import { useAuthStore } from '@/stores/auth'
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

const authStore = useAuthStore()

//////////////////
////샘플 데이터////
const goodsItems1 = [
  {
    goodsId: 1,
    goodsName: '굿즈 이름1',
    artist: '아티스트명1',
    price: '10,000',
    thumbnail: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
  },
  {
    goodsId: 2,
    goodsName: '굿즈 이름2',
    artist: '아티스트명2',
    price: '10,000',
    thumbnail: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
  },
  {
    goodsId: 3,
    goodsName: '굿즈 이름3',
    artist: '아티스트명3',
    price: '10,000',
    thumbnail: 'https://picsum.photos/500/300?image=232',
  },
  {
    goodsId: 4,
    goodsName: '굿즈 이름4',
    artist: '아티스트명4',
    price: '10,000',
    thumbnail: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
  },
  {
    goodsId: 5,
    goodsName: '굿즈 이름5',
    artist: '아티스트명5',
    price: '10,000',
    thumbnail: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
  },
  {
    goodsId: 6,
    goodsName: '굿즈 이름6',
    artist: '아티스트명6',
    price: '10,000',
    thumbnail: 'https://picsum.photos/500/300?image=232',
  },
]
////샘플 데이터////
//////////////////
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
