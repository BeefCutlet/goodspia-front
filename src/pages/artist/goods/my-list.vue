<template>
  <div class="pa-10 d-flex flex-column ga-5 container">
    <h1>내가 만든 굿즈</h1>
    <article v-for="goods in goodsList" :key="goods.goodsId">
      <GoodsMyListCard :goods="goods" />
    </article>
  </div>
</template>

<script setup>
import { getArtist } from '@/api/artist'
import { validateAuth } from '@/util/authUtil'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { getRegisteredGoodsList } from '@/api/goods'

import GoodsMyListCard from '@/components/goods/mypage/GoodsMyListCard.vue'

const router = useRouter()

/**
 * goodsId: 굿즈 번호
 * goodsName: 굿즈명
 * content: 굿즈 상세 이미지 URL
 * price: 굿즈 가격
 * stock: 굿즈 재고 수량
 * wishCount: 찜한 횟수
 * material: 소재
 * size: 사이즈
 * thumbnail: 썸네일 이미지 URL
 * isLimited: 수량 제한 여부 (0 or 1)
 */
const goodsList = ref([])
onBeforeMount(async () => {
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.replace('/auth/sign-in')
    return
  }

  const artist = await getArtist()
  if (!artist) {
    router.replace('/apply')
    return
  }

  const registeredGoodsList = await getRegisteredGoodsList()
  goodsList.value = registeredGoodsList.goodsList
})
</script>

<style lang="scss" scoped>
.card {
  width: 750px;
  height: 200px;
  position: sticky;
  overflow: hidden;

  &:deep(.thumbnail) {
    width: 250px;
    object-fit: contain;
  }
}
</style>
