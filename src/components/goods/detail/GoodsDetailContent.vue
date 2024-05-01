<template>
  <div>
    <div class="d-flex flex-column ga-3 text-center my-5">
      <v-img :src="contentImageUrl" />
      <p><br /></p>
      <h3>옵션</h3>
      <p>디자인 : {{ designs.join(' / ') }}</p>
      <p><br /></p>
      <h3>상품정보고시</h3>
      <p>제품명 : {{ goodsName }}</p>
      <p>소재 : {{ material }}</p>
      <p>사이즈 : {{ size }}</p>
      <p>판매원 : 샵팬픽</p>
      <p>제조국 : 한국</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  contentImageUrl: {
    type: String,
    default: '',
  },
  designs: {
    type: Array,
    default: [''],
  },
  goodsName: {
    type: String,
    default: '',
  },
  material: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped></style>
