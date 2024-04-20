<template>
  <v-app>
    <div class="text-center my-6" style="cursor: pointer">
      <router-link to="/">
        <h1>GOODSPIA</h1>
      </router-link>
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

//로그인 상태면 홈 화면으로 이동
if (!!authStore.token) {
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
