<template>
  <div class="container">
    <div class="toggle-box">
      <button class="login-toggle" @click="$router.push('/auth/sign-in')">
        로그인
      </button>
      <button class="registration-toggle">회원가입</button>
    </div>
    <div class="registration-box">
      <div class="registration-items">
        <input
          type="text"
          id="email"
          class="registration-input"
          placeholder="아이디(이메일 형식)"
          :value="email"
          @input="(event) => (email = event.target.value)"
        />
        <input
          type="password"
          id="password"
          class="registration-input"
          placeholder="비밀번호(영문,숫자,특수문자 포함 8자리 이상)"
          maxlength="20"
          v-model="password"
        />
        <input
          type="password"
          id="passwordConfirm"
          class="registration-input"
          placeholder="비밀번호 확인"
          maxlength="20"
          v-model="passwordConfirm"
        />
        <input
          type="text"
          id="nickname"
          class="registration-input"
          placeholder="닉네임"
          :value="nickname"
          @input="(event) => (nickname = event.target.value)"
        />
        <input
          type="text"
          id="name"
          class="registration-input"
          placeholder="이름"
          :value="name"
          @input="(event) => (name = event.target.value)"
        />
        <v-radio-group inline v-model="gender">
          <v-radio label="남자" value="MAN" />
          <v-radio label="여자" value="WOMAN" />
        </v-radio-group>
        <input
          type="text"
          id="zipcode"
          class="registration-input"
          placeholder="우편번호"
          :value="zipcode"
          @input="(event) => (zipcode = event.target.value)"
        />
        <input
          type="text"
          id="address1"
          class="registration-input"
          placeholder="기본주소"
          :value="address1"
          @input="(event) => (address1 = event.target.value)"
        />
        <input
          type="text"
          id="address2"
          class="registration-input"
          placeholder="상세주소"
          :value="address2"
          @input="(event) => (address2 = event.target.value)"
        />
        <input
          type="text"
          id="phoneNumber"
          class="registration-input"
          placeholder="휴대폰번호(숫자만입력)"
          maxlength="13"
          :value="phoneNumber"
          @input="changePhoneNumberFormat($event)"
        />
        <input
          type="text"
          id="birthday"
          class="registration-input"
          placeholder="생년월일(YYYYMMDD)"
          maxlength="10"
          :value="birthday"
          @input="changeBirthdayFormat($event)"
        />
      </div>
    </div>
    <button class="sign-up-btn" @click="executeSignUp()">회원가입</button>
    <span class="error">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signUp } from '@/api/auth'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

if (!!authStore.token) {
  router.push('/')
}

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const nickname = ref('')
const name = ref('')
const gender = ref('')
const phoneNumber = ref('')
const birthday = ref('')
const zipcode = ref('')
const address1 = ref('')
const address2 = ref('')

const errorMessage = ref('')

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

//생년월일 형식 변경
const changeBirthdayFormat = (event) => {
  const value = event.target.value.split('-').join('')

  if (value.length < 7) {
    birthday.value = value
  } else if (value.length === 7) {
    birthday.value =
      value.substring(0, 4) +
      '-' +
      value.substring(4, 5) +
      '-' +
      value.substring(5, 7)
    event.target.value = birthday.value
  } else if (value.length === 8) {
    birthday.value =
      value.substring(0, 4) +
      '-' +
      value.substring(4, 6) +
      '-' +
      value.substring(6, 8)
    event.target.value = birthday.value
  }
}

//========= 유효성 검사 시작 =========//
//이메일 유효성 검사
const checkEmail = () => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return !!email.value && regex.test(email.value)
}

//비밀번호 유효성 검사
const checkPassword = () => {
  const regex = /^[0-9a-zA-Z!@#$%]{8,20}$/
  return !!password.value && regex.test(password.value)
}

//비밀번호 확인 유효성 검사
const checkPasswordConfirm = () => {
  return !!passwordConfirm.value && passwordConfirm.value === password.value
}

//닉네임 유효성 검사
const checkNickname = () => {
  return !!nickname.value
}

//이름 유효성 검사
const checkName = () => {
  return !!name.value
}

//성별 유효성 검사
const checkGender = () => {
  return !!gender.value && (gender.value === 'MAN' || gender.value === 'WOMAN')
}

//전화번호 유효성 검사
const checkPhoneNumber = () => {
  const regex = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/
  return !!phoneNumber.value && regex.test(phoneNumber.value)
}

//생년월일 유효성 검사
const checkBirthday = () => {
  const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
  return !!birthday.value && regex.test(birthday.value)
}

//우편번호 유효성 검사
const checkZipcode = () => {
  return !!zipcode.value
}

//기본주소 유효성 검사
const checkAddress1 = () => {
  return !!address1.value
}

//상세주소 유효성 검사
const checkAddress2 = () => {
  return !!address2.value
}
//========= 유효성 검사 끝 =========//

const checkValid = () => {
  const isValid = false
  if (
    checkEmail &&
    checkPassword &&
    checkPasswordConfirm &&
    checkNickname &&
    checkName &&
    checkGender &&
    checkPhoneNumber &&
    checkBirthday &&
    checkZipcode &&
    checkAddress1 &&
    checkAddress2
  ) {
    isValid = true
  }
  return isValid
}

//회원가입 실행 (회원가입 버튼 로직)
const executeSignUp = async () => {
  //입력한 회원 정보
  const memberInfo = {
    email: email.value,
    password: password.value,
    nickname: nickname.value,
    name: name.value,
    gender: gender.value,
    phoneNumber: phoneNumber.value,
    birthday: birthday.value,
    zipcode: zipcode.value,
    address1: address1.value,
    address2: address2.value,
  }

  console.log({ ...memberInfo })
  if (!checkValid) {
    errorMessage.value = '입력값이 유효하지 않습니다.'
    return
  }
  errorMessage.value = ''
  await signUp(memberInfo)
  if (!!authStore.token) {
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/auth/sign-up.scss';
</style>
