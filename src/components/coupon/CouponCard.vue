<template>
  <v-card class="my-5 d-flex justify-center" hover link :style="couponStyle">
    <div class="px-10">
      <div class="d-flex justify-space-between align-center">
        <h2 class="title">
          {{ !!coupon ? coupon.couponName : '쿠폰' }}
        </h2>
      </div>
      <p>
        <strong>{{ !!coupon.isExpired ? '사용 불가능' : '사용 가능' }}</strong>
      </p>
      <div class="d-flex justify-space=between py-5">
        <div class="d-flex flex-column">
          <p class="detail">
            할인금액 : {{ coupon.discountAmount }}
            {{ coupon.discountPolicy === 'PERCENTAGE' ? '%' : '원' }}
          </p>
          <p class="detail">사용기한 : {{ coupon.expiryTime }}</p>
        </div>
        <div class="d-flex flex-column">
          <p class="detail">최대 할인 금액 : {{ coupon.discountLimit }} 원</p>
          <p class="detail">
            최소 상품 금액 :
            {{ coupon.minimumOrderValue }} 원
          </p>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  coupon: {
    type: Object,
    default: {
      couponName: '',
      isExpired: true,
      discountAmount: 0,
      discountPolicy: 'FIXED_AMOUNT',
      expiryTime: '0000-00-00T00:00:00',
      discountLimit: 0,
      minimumOrderValue: 0,
    },
  },
  customStyle: {
    type: Object,
    default: { width: '90%' },
  },
})

const couponDisabledStyle = {
  'background-color': 'rgb(0, 0, 0, 0.25)',
}
const couponAbledStyle = props.customStyle
const couponStyle = computed(() => {
  return !!props.coupon.isExpired ? couponDisabledStyle : couponAbledStyle
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
