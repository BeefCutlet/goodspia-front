<template>
  <section>
    <article v-for="coupon in coupons" :key="coupon.couponId">
      <CouponCard :coupons="coupon" />
    </article>
  </section>
</template>

<script setup>
import CouponCard from './CouponCard.vue'

const props = defineProps({
  coupons: Object,
})
</script>

<style lang="scss" scoped></style>
