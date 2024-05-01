<template>
  <v-app>
    <HomeHeader />
    <v-main>
      <router-view :style="pageContainerStyles" />
    </v-main>
  </v-app>
</template>

<script setup>
import HomeHeader from '@/components/home/HomeHeader.vue'
import { retakeToken } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

const pageContainerStyles = computed(() => ({
  width: '1440px',
  margin: '0 auto',
  padding: '30px',
}))

const authStore = useAuthStore()

//로그인 상태인지 검증 - 액세스 토큰이 없으면 리프레시 토큰을 이용하여 액세스 토큰 재발급 요청
onMounted(() => {
  if (!authStore.token) {
    retakeToken()
  }
})
</script>

<style scoped></style>
