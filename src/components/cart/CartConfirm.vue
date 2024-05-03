<template>
  <v-sheet
    v-if="modelValue"
    class="pa-4 text-center mx-auto"
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
  >
    <h2 class="text-h5 mb-6">
      '장바구니에 상품이 정상적으로 담겼습니다. 장바구니로 이동하시겠습니까?'
    </h2>
    <v-divider class="mb-4"></v-divider>

    <div class="text-center">
      <v-btn
        class="text-none"
        color="primary"
        variant="flat"
        width="90"
        rounded
        @click="$emit('approve')"
      >
        예
      </v-btn>
      <v-btn
        class="text-none"
        color="error"
        variant="flat"
        width="90"
        rounded
        @click="$emit('cancel')"
      >
        아니오
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['approve', 'cancel'])
</script>

<style lang="scss" scoped></style>
