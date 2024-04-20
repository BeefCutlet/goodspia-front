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
      <button class="pay-method-btn">카카오페이</button>
    </div>
  </div>
</template>

<script setup>
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

.pay-method-btn {
  width: 40%;
  color: white;
  background-color: #4665c4;
}

.deliveryMessage {
  width: 500px;

  &::placeholder {
    text-indent: 12px;
  }
}
</style>
