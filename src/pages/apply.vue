<template>
  <div class="container d-flex flex-column ga-5">
    <h1 class="text-center">아티스트 등록</h1>

    <!-- 닉네임 입력 -->
    <input
      id="nickname"
      type="text"
      class="apply-input"
      placeholder="희망닉네임"
      :value="nickname"
      @input="(event) => (nickname = event.target.value)"
    />

    <!-- 휴대폰번호 입력 -->
    <input
      type="text"
      id="phoneNumber"
      class="apply-input"
      placeholder="휴대폰번호(숫자만입력)"
      maxlength="13"
      :value="phoneNumber"
      @input="changePhoneNumberFormat($event)"
    />

    <!-- 은행 선택 -->
    <v-select
      variant="outlined"
      label="은행 선택"
      :items="bank"
      v-model="accountBank"
    ></v-select>

    <!-- 계좌번호 입력 -->
    <input
      id="accountNumber"
      type="text"
      class="apply-input"
      placeholder="계좌번호(숫자만 입력)"
      :value="accountNumber"
      @input="(event) => (accountNumber = event.target.value)"
    />

    <button class="apply-btn" @click="apply">신청하기</button>
  </div>
</template>

<script setup>
import { applyForArtist, getArtist } from '@/api/artist'
import { validateAuth } from '@/util/authUtil'
import { onBeforeMount } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(async () => {
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.replace('/auth/sign-in')
  }

  const artist = await getArtist()
  if (!!artist) {
    router.replace('/artist/goods/register')
  }
})

const bank = ['KB', 'SHINHAN', 'NH']

//input 변수
const accountBank = ref('')
const accountNumber = ref('')
const nickname = ref('')
const phoneNumber = ref('')

//전화번호 형식 변경
const changePhoneNumberFormat = (event) => {
  const value = event.target.value.split('-').join('')

  if (value.length < 10) {
    phoneNumber.value = value
  } else if (value.length === 10) {
    phoneNumber.value =
      value.substring(0, 3) +
      '-' +
      value.substring(3, 6) +
      '-' +
      value.substring(6, 10)
    event.target.value = phoneNumber.value
  } else if (value.length === 11) {
    phoneNumber.value =
      value.substring(0, 3) +
      '-' +
      value.substring(3, 7) +
      '-' +
      value.substring(7, 11)
    event.target.value = phoneNumber.value
  }
}

const apply = async () => {
  const artist = {
    nickname: nickname.value,
    accountBank: accountBank.value,
    accountNumber: accountNumber.value,
    phoneNumber: phoneNumber.value,
  }

  const isSuccess = await applyForArtist(artist)
  if (!isSuccess) {
    return
  }
  router.replace('/artist')
}
</script>

<style lang="scss" scoped>
.container {
  width: 400px;
  margin: 0 auto;
}

.apply-input {
  width: 320px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background-color: #f2f2f2;
  text-indent: 12px;

  &::placeholder {
    font-size: 14px;
    color: #a2a2a2;
    text-indent: 12px;
  }
}

.apply-btn {
  width: 320px;
  height: 60px;
  border-radius: 50px;
  color: white;
  background-color: royalblue;
  padding: 20px;

  font-weight: bold;
  font-size: 21px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
