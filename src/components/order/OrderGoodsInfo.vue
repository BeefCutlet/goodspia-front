<template>
  <div class="container">
    <h2>주문상품 정보</h2>
    <section v-if="orderItems.length > 0">
      <h2>샵팬픽 배송</h2>
      <span class="text-caption">
        배송비: {{ deliveryCharge.toLocaleString() }}원
      </span>
      <div>
        <div v-for="orderItem in orderItems" :key="orderItem.goodsId">
          <v-divider class="my-4" />
          <article class="d-flex justify-space-between">
            <div>
              <h3>{{ orderItem.artistNickname }}</h3>
              <h3>{{ orderItem.goodsName }}</h3>
              <p>
                {{ orderItem.price.toLocaleString() }}원 / 수량
                {{ orderItem.quantity }}개
              </p>
            </div>
            <img class="thumbnail" :src="orderItem.thumbnail" alt="Thumbnail" />
          </article>
        </div>
      </div>
    </section>
    <v-divider class="my-4" />
    <div class="d-flex justify-space-between align-center">
      <strong>결제금액</strong>
      <h2 class="red">
        {{ (totalPrice + deliveryCharge).toLocaleString() }}원
      </h2>
    </div>
    <v-divider class="my-4" />
    <div class="d-flex justify-space-between">
      <p>주문 상품 수</p>
      <p>{{ totalQuantity }}개</p>
    </div>
    <div class="d-flex justify-space-between">
      <p>총 주문금액</p>
      <p>{{ totalPrice.toLocaleString() }}원</p>
    </div>
    <div class="d-flex justify-space-between">
      <p>총 배송비</p>
      <p>{{ deliveryCharge.toLocaleString() }}원</p>
    </div>
    <v-divider class="my-4" />
    <div class="d-flex justify-space-between align-center">
      <h2>최종 결제금액</h2>
      <h2 class="red">
        {{ (totalPrice + deliveryCharge).toLocaleString() }}원
      </h2>
    </div>
    <button class="pay-btn my-4" @click="pay">결제하기</button>
  </div>
</template>

<script setup>
import * as PortOne from '@portone/browser-sdk/v2'
import { onMounted } from 'vue'
import { computed } from 'vue'
import { ref } from 'vue'
import { addOrders, deleteOrder } from '@/api/order'
import { completePayment } from '@/api/payment'
import { useToastStore } from '@/stores/toast'
import { usePaymentStore } from '@/stores/pay'

const props = defineProps({
  memberInfo: Object,
})

const toastStore = useToastStore()

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

/**
 * PORTONE 결제창
 */
const paymentStore = usePaymentStore()
const pay = async () => {
  const orders = []
  orderItems.forEach((orderItem) => {
    const item = {
      quantity: orderItem.quantity,
      totalPrice: orderItem.price * orderItem.quantity,
      goodsId: orderItem.goodsId,
      goodsDesign: orderItem.designName,
    }
    orders.push(item)
  })
  const savedOrder = await addOrders(orders)
  if (!savedOrder) {
    return
  }

  const response = await PortOne.requestPayment({
    // Store ID 설정
    storeId: import.meta.env.VITE_STORE_ID,
    // 채널 키 설정
    channelKey: import.meta.env.VITE_TOSSPAYMENT_CHANNEL_ID,
    paymentId: 'PAYMENT-' + savedOrder.orderUid.substring('ORDER-'.length()),
    orderName:
      orderItems.length > 1
        ? orderItems[0].goodsName + ' 외 ' + orderItems.length - 1 + '개'
        : orderItems[0].goodsName,
    totalAmount: totalPrice.value + deliveryCharge.value,
    currency: 'KRW',
    payMethod: paymentStore.payMethod,
    customer: {
      customerId: props.memberInfo.email,
      fullName: props.memberInfo.name,
      email: props.memberInfo.email,
      phoneNumber: '010-2345-6789',
      address: {
        country: 'KR',
        addressLine1: props.memberInfo.address.address1,
        addressLine2: props.memberInfo.address.address2,
        city: '도시',
        province: '주',
      },
      zipcode: props.memberInfo.address.zipcode,
      gender: 'MALE',
      birthYear: '2000',
      birthMonth: '11',
      birthDay: '11',
    },
  })
  console.log('payment result: ', response)

  if (response.code != null) {
    await deleteOrder(savedOrder.orderId)
    toastStore.useToast('결제 요청 실패')
    return
  }

  console.log('paymentUid: ', response.paymentId)
  const newPayment = {
    paymentUid: response.paymentId,
    orderId: savedOrder.orderId,
    amount: savedOrder.amount,
  }
  const isSuccess = await completePayment(newPayment)
  if (isSuccess) {
    toastStore.useSuccessToast('주문 완료')
  }
}
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
