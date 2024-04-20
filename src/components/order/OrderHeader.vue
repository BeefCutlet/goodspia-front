<template>
  <div>
    <article class="d-flex justify-center ga-10 my-7">
      <strong class="step" :style="step === 'CART' ? active : ''">
        01 장바구니
      </strong>
      <strong class="step" :style="step === 'ORDER' ? active : ''">
        02 주문하기
      </strong>
      <strong class="step" :style="step === 'COMPLETE' ? active : ''">
        03 주문완료
      </strong>
    </article>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
  step: {
    type: String,
  },
})

const active = computed(() => ({
  color: 'black',
  border: '2px solid black',
}))
</script>

<style lang="scss" scoped>
.step {
  width: 150px;
  height: 60px;
  border: 2px solid #a2a2a2;
  border-radius: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  font-size: large;
  color: #a2a2a2;
}
</style>
