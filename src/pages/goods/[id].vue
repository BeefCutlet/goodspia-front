<template>
  <div class="mb-15">
    <v-container>
      <v-row>
        <v-col class="d-flex">
          <v-img :src="goodsItem.thumbnail" />
        </v-col>
        <v-col>
          <!-- 굿즈 세부 정보 선택 폼 -->
          <GoodsDetailForm
            :goods-item="goodsItem"
            :goods-designs="goodsDesigns"
            :wish-status="wishStatus"
            :coupons="coupons.coupons"
            @toggle-wish="toggleWish"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- 세부 내용 메뉴 -->
    <GoodsDetailMenu />
    <div class="my-16 px-10 text-center">
      <GoodsDetailContent
        :content-image-url="goodsItem.content"
        :goods-name="goodsItem.name"
        :material="goodsItem.material"
        :size="goodsItem.size"
        :designs="goodsDesignNames"
      />
    </div>

    <!-- 리뷰 -->
    <article class="px-10 my-16">
      <h2 class="px-6 mb-3">리뷰</h2>
      <GoodsDetailReview />
    </article>

    <!-- Q&A -->
    <div class="px-10 my-16">
      <h2 class="px-6 mb-3">Q&A</h2>
      <GoodsDetailQnA />
    </div>
  </div>
</template>

<script setup>
import GoodsDetailForm from '@/components/goods/detail/GoodsDetailForm.vue'
import GoodsDetailMenu from '@/components/goods/detail/GoodsDetailMenu.vue'
import GoodsDetailReview from '@/components/goods/detail/GoodsDetailReview.vue'
import GoodsDetailQnA from '@/components/goods/detail/GoodsDetailQnA.vue'
import GoodsDetailContent from '@/components/goods/detail/GoodsDetailContent.vue'
import { useRoute } from 'vue-router'
import { getGoods } from '@/api/goods'
import { ref, onBeforeMount, watch } from 'vue'
import { addWish, deleteWish, getWishStatus } from '@/api/wish'
import { getGoodsCouponList } from '@/api/coupon'

const route = useRoute()
const goodsId = route.params.id

const goodsItem = ref({})
const goodsDesigns = ref([])
const goodsDesignNames = ref([])

const wish = ref(null)
const wishStatus = ref(false)

//쿠폰 목록
const coupons = ref([])

//액세스 토큰에 변화가 생길 경우(로그인 상태 변화), 찜하기 상태를 재확인
watch(wish, async (current) => {
  if (!!current) {
    const wish = await getWishStatus(goodsId)
    wishStatus.value = wish.wishStatus
  }
})

const getGoodsItem = async () => {
  goodsItem.value = await getGoods(goodsId)

  goodsItem.value.goodsDesigns.forEach((design) => {
    const designInfo = JSON.parse(
      JSON.stringify({
        title: design.designName,
        props: {
          designName: design.designName,
          designId: design.designId,
        },
      }),
    )
    goodsDesigns.value.push(designInfo)
    goodsDesignNames.value.push(design.designName)
  })

  wish.value = await getWishStatus(goodsId)
}

/**
 * 쿠폰 목록 조회
 */
const getGoodsCoupons = async (goodsId) => {
  coupons.value = await getGoodsCouponList(goodsId)
}

onBeforeMount(async () => {
  await getGoodsItem()
  await getGoodsCoupons(goodsId)
})

const toggleWish = async () => {
  let isSuccess = false
  if (!!wishStatus.value) {
    isSuccess = await deleteWish(goodsId)
  } else {
    isSuccess = await addWish(goodsId)
  }

  if (isSuccess) {
    wishStatus.value ? goodsItem.value.wishCount-- : goodsItem.value.wishCount++
    wishStatus.value = !wishStatus.value
  }
}
</script>

<style lang="scss" scoped></style>
