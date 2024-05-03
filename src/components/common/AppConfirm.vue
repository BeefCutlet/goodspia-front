<template>
  <v-sheet
    class="pa-4 text-center mx-auto"
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
  >
    <h2 class="text-h5 mb-6">{{ message }}</h2>
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
        {{ confirmBtn }}
      </v-btn>
      <v-btn
        class="text-none"
        color="error"
        variant="flat"
        width="90"
        rounded
        @click="$emit('cancel')"
      >
        {{ cancelBtn }}
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: '',
  },
  approveBtn: {
    type: String,
    default: '예',
  },
  cancelBtn: {
    type: String,
    default: '아니오',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['approve', 'cancel'])
</script>

<style lang="scss" scoped></style>
