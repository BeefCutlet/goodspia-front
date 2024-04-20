<template>
  <div class="container">
    <h2>주문상품 정보</h2>
    <section v-if="orderItems.length > 0">
      <h2>샵팬픽 배송</h2>
      <span class="text-caption">배송비: {{ deliveryCharge }}원</span>
      <div>
        <div v-for="orderItem in orderItems" :key="orderItem.goodsId">
          <v-divider class="my-4" />
          <article class="d-flex justify-space-between">
            <div>
              <h3>{{ orderItem.artistNickname }}</h3>
              <h3>{{ orderItem.goodsName }}</h3>
              <p>{{ orderItem.price }}원 / 수량 {{ orderItem.quantity }}개</p>
            </div>
            <img class="thumbnail" :src="orderItem.thumbnail" alt="Thumbnail" />
          </article>
        </div>
      </div>
    </section>
    <v-divider class="my-4" />
    <div class="d-flex justify-space-between align-center">
      <strong>결제금액</strong>
      <h2 class="red">{{ totalPrice + deliveryCharge }}원</h2>
    </div>
    <v-divider class="my-4" />
    <div class="d-flex justify-space-between">
      <p>주문 상품 수</p>
      <p>{{ totalQuantity }}개</p>
    </div>
    <div class="d-flex justify-space-between">
      <p>총 주문금액</p>
      <p>{{ totalPrice }}원</p>
    </div>
    <div class="d-flex justify-space-between">
      <p>총 배송비</p>
      <p>{{ deliveryCharge }}원</p>
    </div>
    <v-divider class="my-4" />
    <div class="d-flex justify-space-between align-center">
      <h2>최종 결제금액</h2>
      <h2 class="red">{{ totalPrice + deliveryCharge }}원</h2>
    </div>
    <button class="pay-btn my-4">결제하기</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { computed } from 'vue'
import { ref } from 'vue'

const orderItems = JSON.parse(localStorage.getItem('goodspia_order_items'))
const isOrderItemsExist = () => {
  return orderItems !== null && orderItems.length > 0
}

const totalQuantity = ref(0)
const totalPrice = ref(0)
const deliveryCharge = computed(() => (isOrderItemsExist ? 3000 : 0))

onMounted(() => {
  if (isOrderItemsExist) {
    orderItems.forEach((orderItem) => {
      totalQuantity.value += orderItem.quantity
      totalPrice.value += orderItem.price * orderItem.quantity
    })
  }
})
</script>

<style lang="scss" scoped>
.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.container {
  width: 500px;
  line-height: 2.2;
}

.tag {
  width: 100px;
}

.red {
  color: #ef5350;
}

.pay-btn {
  width: 100%;
  height: 70px;
  background-color: #4665c4;
  color: white;
  font-size: 21px;
  border-radius: 5px;
}
</style>
