<template>
  <div class="container">
    <div class="toggle-box">
      <button class="login-toggle">로그인</button>
      <button
        class="registration-toggle"
        @click="$router.push('/auth/sign-up')"
      >
        회원가입
      </button>
    </div>
    <div class="login-box">
      <div class="login-items">
        <input
          type="text"
          class="login-input"
          placeholder="아이디를 입력해주세요"
          v-model="email"
        />
        <input
          type="password"
          class="login-input"
          placeholder="비밀번호를 입력해주세요"
          v-model="password"
        />
      </div>
      <div class="find-pw-box">
        <span style="cursor: pointer">비밀번호 찾기</span>
      </div>
      <div class="login-items">
        <button
          id="loginBtn"
          class="login-button"
          @click="signIn(email, password)"
        >
          로그인
        </button>
        <button class="login-button kakao">카카오 로그인</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { login } from '@/api/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onKeyStroke } from '@vueuse/core'

const router = useRouter()

const email = ref('')
const password = ref('')

//로그인 - 이메일, 패스워드 입력하여 로그인, 성공하면 홈 화면으로 이동
const signIn = (id, pw) => {
  login(id, pw).then(() => {
    router.push('/')
  })
}

onKeyStroke('Enter', (e) => {
  document.getElementById('loginBtn').click()
})
</script>

<style lang="scss" scoped>
@import '../../styles/auth/sign-in.scss';
</style>
