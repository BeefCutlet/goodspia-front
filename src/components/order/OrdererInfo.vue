<template>
  <div class="container">
    <h2>주문자 정보</h2>
    <div class="d-flex">
      <p class="tag">이름</p>
      <p class="info">{{ memberInfo.name }}</p>
    </div>
    <div class="d-flex">
      <p class="tag">이메일</p>
      <p class="info">{{ memberInfo.email }}</p>
    </div>
    <div class="d-flex">
      <p class="tag">연락처</p>
      <p class="info">{{ memberInfo.phoneNumber }}</p>
    </div>
    <v-divider class="my-4" />
    <h2>배송정보</h2>
    <div class="d-flex">
      <p class="tag">이름</p>
      <p class="info">{{ memberInfo.name }}</p>
    </div>
    <div class="d-flex">
      <p class="tag">연락처</p>
      <p class="info">{{ memberInfo.phoneNumber }}</p>
    </div>
    <div class="d-flex">
      <p class="tag">배송지</p>
      <p class="info">
        ({{ memberInfo.address.zipcode }})&nbsp;
        {{ memberInfo.address.address1 }}
        <br />{{ memberInfo.address.address2 }}
      </p>
    </div>
    <div class="d-flex">
      <p class="tag">배송메시지</p>
      <input type="text" placeholder="배송메시지" class="deliveryMessage" />
    </div>
    <v-divider class="my-4" />
    <div>
      <h2>결제방법</h2>
      <button
        :class="
          paymentMethod === 'CARD' ? 'pay-method-clicked-btn' : 'pay-method-btn'
        "
        @click="(event) => changePayMethod(event.target.value)"
        value="CARD"
      >
        카드 결제
      </button>
      <button
        :class="
          paymentMethod === 'TRANSFER'
            ? 'pay-method-clicked-btn'
            : 'pay-method-btn'
        "
        @click="(event) => changePayMethod(event.target.value)"
        value="TRANSFER"
      >
        실시간 계좌이체
      </button>
      <button
        :class="
          paymentMethod === 'EASY_PAY'
            ? 'pay-method-clicked-btn'
            : 'pay-method-btn'
        "
        @click="(event) => changePayMethod(event.target.value)"
        value="EASY_PAY"
      >
        카카오페이
      </button>
    </div>
  </div>
</template>

<script setup>
import { usePaymentStore } from '@/stores/pay'
import { ref } from 'vue'

const props = defineProps({
  memberInfo: {
    type: Object,
    default: {
      email: '',
      nickname: '',
      name: '',
      gender: '',
      phoneNumber: '',
      birthday: '',
      address: {
        zipcode: '',
        address1: '',
        address2: '',
      },
    },
  },
})

const paymentStore = usePaymentStore()
const changePayMethod = (payMethod) => {
  paymentStore.setPayMethod(payMethod)
  paymentMethod.value = payMethod
}
const paymentMethod = ref('CARD')
</script>

<style lang="scss" scoped>
.container {
  width: 750px;
  padding-left: 70px;
  line-height: 2.2;
}

.tag {
  width: 100px;
}

.info {
  width: 900px;
}

.pay-method-clicked-btn {
  width: 40%;
  color: white;
  background-color: #4665c4;
  margin-right: 12px;
  margin-bottom: 20px;
}

.pay-method-btn {
  width: 40%;
  color: black;
  background-color: #f2f2f2;
  margin-right: 12px;
  margin-bottom: 20px;
}

.deliveryMessage {
  width: 500px;

  &::placeholder {
    text-indent: 12px;
  }
}
</style>
