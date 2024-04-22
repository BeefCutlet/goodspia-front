<template>
  <div class="profile my-10">
    <h3>아티스트 프로필 수정</h3>

    <!-- 프로필 이미지 -->
    <div v-if="!!profileImage">
      <img :src="item.thumbnail" class="thumbnail" />
    </div>
    <div v-else-if="!profileImage">
      <img
        :src="'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'"
        class="thumbnail"
      />
    </div>

    <!-- 닉네임 입력 -->
    <div class="content">
      <p class="tag">닉네임</p>
      <input
        id="nickname"
        type="text"
        class="apply-input"
        placeholder="희망닉네임"
        :value="nickname"
        @input="(event) => (nickname = event.target.value)"
      />
    </div>

    <!-- 휴대폰번호 입력 -->
    <div class="content">
      <p class="tag">휴대폰번호</p>
      <input
        type="text"
        class="phone-input"
        :value="phoneFirst"
        @input="(event) => (phoneFirst = event.target.value)"
      />-
      <input
        type="text"
        class="phone-input"
        :value="phoneSecond"
        @input="(event) => (phoneSecond = event.target.value)"
      />-
      <input
        type="text"
        class="phone-input"
        :value="phoneThird"
        @input="(event) => (phoneThird = event.target.value)"
      />
    </div>

    <!-- 은행 선택 -->
    <div class="content">
      <p class="tag">은행</p>
      <v-select
        variant="outlined"
        label="은행 선택"
        :items="bank"
        v-model="accountBank"
      ></v-select>
    </div>

    <!-- 계좌번호 입력 -->
    <div class="content">
      <p class="tag">계좌번호</p>
      <input
        id="accountNumber"
        type="text"
        class="apply-input"
        placeholder="계좌번호(숫자만 입력)"
        :value="accountNumber"
        @input="(event) => (accountNumber = event.target.value)"
      />
    </div>

    <div class="d-flex justify-end align-center ga-5 my-5">
      <v-btn variant="tonal">취소</v-btn>
      <v-btn variant="flat" color="primary" @click="">완료</v-btn>
    </div>
  </div>
</template>

<script setup>
import { getArtist } from '@/api/artist'
import { validateAuth } from '@/util/authUtil'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const bank = ['KB', 'SHINHAN', 'NH']

//input 변수
const profileImage = ref('')
const nickname = ref('')
const accountBank = ref('')
const accountNumber = ref('')
const phoneFirst = ref('')
const phoneSecond = ref('')
const phoneThird = ref('')

const artistInfo = ref('')
//아티스트 정보 조회
const getArtistInfo = async () => {
  //인증
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.replace('/auth/sign-in')
    return
  }

  //아티스트 프로필 정보
  const artist = await getArtist()
  if (!artist) {
    router.replace('/apply')
  }

  return artist
}

onBeforeMount(async () => {
  artistInfo.value = await getArtistInfo()

  profileImage.value =
    artistInfo.value.profileImage !== null || ''
      ? artistInfo.value.profileImage
      : ''
  nickname.value = artistInfo.value.nickname
  accountBank.value = artistInfo.value.accountBank
  accountNumber.value = artistInfo.value.accountNumber

  const phone = artistInfo.value.phoneNumber.split('-')
  phoneFirst.value = phone[0]
  phoneSecond.value = phone[1]
  phoneThird.value = phone[2]
})
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.tag {
  width: 100px;
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

.phone-input {
  width: 200px;
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

.thumbnail {
  width: 120px;
  object-fit: contain;
}
</style>
