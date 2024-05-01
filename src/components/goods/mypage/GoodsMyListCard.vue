<template>
  <v-card class="mx-auto d-flex ga-3 card">
    <router-link :to="`/goods/${goods.goodsId}`" class="d-flex align-center">
      <img :src="goods.thumbnail" class="thumbnail" />
    </router-link>
    <div class="px-10" style="width: 100%">
      <div class="d-flex justify-space-between align-center">
        <h2 class="title">
          <router-link :to="`/goods/${goods.goodsId}`">
            {{ goods.goodsName }}
          </router-link>
        </h2>
        <p class="title">
          <router-link :to="`/artist/goods/${goods.goodsId}/edit`">
            수정하기<v-icon icon="mdi-chevron-right" />
          </router-link>
        </p>
      </div>
      <div class="d-flex justify-space-between">
        <div class="d-flex flex-column">
          <p class="detail">가격 : {{ goods.price }}원</p>
          <p class="detail">
            남은 수량 :
            {{ goods.isLimited == 0 ? '수량제한 없음' : goods.stock }}
          </p>
          <p class="detail">찜한 사람 수 : {{ goods.wishCount }}</p>
        </div>

        <div class="d-flex flex-column mx-5">
          <p class="detail">소재 : {{ goods.material }}</p>
          <p class="detail">사이즈 : {{ goods.size }}</p>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  goods: {
    type: Object,
  },
})
</script>

<style lang="scss" scoped>
.title {
  margin-left: 18px;
  margin-right: 18px;
  margin-top: 15px;
}

.detail {
  margin-left: 18px;
  margin-top: 15px;
}
</style>
