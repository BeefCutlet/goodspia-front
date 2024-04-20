<template>
  <div class="mb-15">
    <v-container>
      <v-row>
        <v-col>
          <v-img :src="goodsItem.thumbnail" />
        </v-col>
        <v-col>
          <!-- 굿즈 세부 정보 선택 폼 -->
          <GoodsDetailForm
            :goods-item="goodsItem"
            :goods-designs="goodsDesigns"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- 세부 내용 메뉴 -->
    <GoodsDetailMenu />
    <div class="my-16 px-10 text-center">
      <p>굿즈 세부 사항</p>
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
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { getGoods } from '@/api/goods'
import { ref } from 'vue'

const route = useRoute()

const goodsItem = ref({})
const goodsDesigns = ref([])
const getGoodsItem = async () => {
  const id = route.params.id
  goodsItem.value = await getGoods(id)
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
  })
}

onMounted(() => {
  getGoodsItem()
})
</script>

<style lang="scss" scoped></style>
