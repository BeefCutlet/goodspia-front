<template>
  <div class="pa-10 d-flex flex-column ga-5 container">
    <h1>아티스트 프로필 수정</h1>

    <!-- 프로필 이미지 -->
    <div
      class="d-flex flex-column ga-5 justify-center align-center my-5 profile-image-box"
    >
      <label for="profileImage" class="profile-image-label">
        <img
          :src="profileImage"
          class="profile-image"
          style="cursor: pointer; position: relative"
        />
      </label>
    </div>
    <!-- 이미지 선택 -->
    <div style="display: none">
      <input
        id="profileImage"
        type="file"
        @input="(event) => addImage(event.target)"
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
        @input="(event) => validatePhoneFirst(event)"
      />-
      <input
        type="text"
        class="phone-input"
        :value="phoneSecond"
        @input="(event) => validatePhoneSecond(event)"
      />-
      <input
        type="text"
        class="phone-input"
        :value="phoneThird"
        @input="(event) => validatePhoneThird(event)"
      />
    </div>

    <!-- 은행 선택 -->
    <div class="content">
      <p class="tag">은행</p>
      <div style="width: 200px">
        <v-select
          variant="outlined"
          label="은행 선택"
          :items="bank"
          v-model="accountBank"
        ></v-select>
      </div>
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
      <v-btn variant="tonal" @click="reset">초기화</v-btn>
      <v-btn variant="flat" color="primary" @click="modifyArtistInfo">
        수정
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { getArtist, updateArtist } from '@/api/artist'
import { validateAuth } from '@/util/authUtil'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const bank = ['KB', 'SHINHAN', 'NH']

const newProfileImage = ref('')

//input 변수
const profileImage = ref('')
const nickname = ref('')
const accountBank = ref('')
const accountNumber = ref('')
const phoneFirst = ref('')
const phoneSecond = ref('')
const phoneThird = ref('')

//아티스트 정보 조회
const artistInfo = ref('')
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

  profileImage.value = !!artistInfo.value.profileImage
    ? artistInfo.value.profileImage
    : import.meta.env.VITE_BASIC_PROFILE_IMAGE
  nickname.value = artistInfo.value.nickname
  accountBank.value = artistInfo.value.accountBank
  accountNumber.value = artistInfo.value.accountNumber

  const phone = artistInfo.value.phoneNumber.split('-')
  phoneFirst.value = phone[0]
  phoneSecond.value = phone[1]
  phoneThird.value = phone[2]
})

//전화번호 수정 시 검증
//=> 전화번호 첫번째
const validatePhoneFirst = (event) => {
  if (event.target.value.length > 3) {
    event.target.value = phoneFirst.value
    return
  }
  phoneFirst.value = event.target.value
}
//=> 전화번호 두번째
const validatePhoneSecond = (event) => {
  if (event.target.value.length > 4) {
    event.target.value = phoneSecond.value
    return
  }
  phoneSecond.value = event.target.value
}
//=> 전화번호 세번째
const validatePhoneThird = (event) => {
  if (event.target.value.length > 4) {
    event.target.value = phoneThird.value
    return
  }
  phoneThird.value = event.target.value
}

//아티스트 정보 수정 - 수정 버튼 클릭 시 이벤트
const modifyArtistInfo = async () => {
  //아티스트 정보
  const artist = {
    nickname: nickname.value,
    accountBank: accountBank.value,
    accountNumber: accountNumber.value,
    phoneNumber:
      phoneFirst.value + '-' + phoneSecond.value + '-' + phoneThird.value,
  }

  //전달할 아티스트 객체 BLOB
  const blob = new Blob([JSON.stringify(artist)], {
    type: 'application/json',
  })

  //프로필 이미지 파일
  const artistFormData = new FormData()
  artistFormData.append('artist', blob)
  artistFormData.append('profileImage', newProfileImage.value)

  const isSuccess = await updateArtist(artistFormData)
  if (!isSuccess) {
  }
}

//초기화 - 초기화 버튼 클릭 시 이벤트
const reset = () => {
  profileImage.value = !!artistInfo.value.profileImage
    ? artistInfo.value.profileImage
    : 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
  nickname.value = artistInfo.value.nickname
  accountBank.value = artistInfo.value.accountBank
  accountNumber.value = artistInfo.value.accountNumber

  const phone = artistInfo.value.phoneNumber.split('-')
  phoneFirst.value = phone[0]
  phoneSecond.value = phone[1]
  phoneThird.value = phone[2]

  newProfileImage.value = ''
}

//이미지 추가
const addImage = (inputFile) => {
  const file = inputFile.files[0]
  console.log('file: ', file)
  profileImage.value = URL.createObjectURL(file)
  newProfileImage.value = file
}
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
  width: 250px;
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
  width: 150px;
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

.profile-image-box {
  .profile-image-label {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-color: white;
  }

  .profile-image {
    width: 250px;
    height: 250px;
    padding: 10px;
    object-fit: contain;
    border-radius: 50%;
    border: 3px solid #a2a2a2;
  }
}
</style>
