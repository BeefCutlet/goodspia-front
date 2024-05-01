<template>
  <v-dialog>
    <v-card :style="{ width: '1440px' }">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="$emit('update:isPreviewOpen')"></v-btn>
        <v-toolbar-title>미리보기</v-toolbar-title>
      </v-toolbar>

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
    </v-card>
  </v-dialog>
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

defineEmits(['update:isPreviewOpen'])
</script>

<style lang="scss" scoped>
.container {
  width: 1440px;
}
</style>
