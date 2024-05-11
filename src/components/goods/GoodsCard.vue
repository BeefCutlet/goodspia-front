<template>
  <v-card class="mx-auto d-flex justify-space-between card">
    <img :src="item.thumbnail" class="thumbnail" />
    <div>
      <v-card-title class="font-weight-bold">
        <!-- 아티스트명 -->
        {{ item.artistNickname }}
      </v-card-title>
      <v-card-subtitle>{{ item.goodsName }}</v-card-subtitle>
      <v-card-text>{{ item.price }}원</v-card-text>
    </div>
    <div class="d-flex flex-column justify-center align-center ma-1">
      <!-- 찜하기 버튼 -->
      <v-btn
        :icon="
          item.wishStatus === true
            ? 'mdi-cards-heart'
            : 'mdi-cards-heart-outline'
        "
        variant="flat"
      />
      <span class="text-caption">{{ item.wishCount }}</span>
    </div>
  </v-card>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
  },
})
</script>

<style lang="scss" scoped>
.card {
  width: 400px;
  height: 120px;
  position: sticky;
  overflow: hidden;

  .thumbnail {
    width: 120px;
    object-fit: contain;
  }
}
</style>
