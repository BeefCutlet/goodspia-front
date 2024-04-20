<template>
  <div>
    <p>디자인&nbsp;:&nbsp;{{ designName }}</p>
    <div class="d-flex justify-end align-center">
      <div class="d-flex align-center ga-1 mx-4">
        <v-btn
          icon="mdi-minus"
          density="compact"
          elevation="0"
          @click.stop="$emit('update-minus:quantity', designId)"
        />
        <p class="d-flex align-center text-h6">{{ quantity }}</p>
        <v-btn
          icon="mdi-plus"
          density="compact"
          elevation="0"
          @click.stop="$emit('update-plus:quantity', designId)"
        />
      </div>
      <p class="text-h6 mx-3">{{ totalPrice }}원</p>
      <v-btn
        icon="mdi-close"
        density="compact"
        elevation="0"
        @click.stop="$emit('delete:design', designId)"
      />
      <v-icon />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  designName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  designId: {
    type: Number,
  },
})

defineEmits(['update-plus:quantity', 'update-minus:quantity', 'delete:design'])

const totalPrice = computed(() => {
  return props.price * props.quantity
})
</script>

<style lang="scss" scoped></style>
