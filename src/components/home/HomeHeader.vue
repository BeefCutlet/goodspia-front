<template>
  <v-app-bar class="elevation-1">
    <!-- 상단 메인 로고 -->
    <v-app-bar-title class="menubar-title">
      <router-link to="/">
        <div class="top-logo">
          <h3>GOODSPIA</h3>
        </div>
      </router-link>
    </v-app-bar-title>

    <!-- 검색 아이콘 -->
    <span class="mx-3" @click="applyForArtist" style="cursor: pointer">
      굿즈 판매하기
    </span>
    <v-btn icon="mdi-magnify"></v-btn>

    <!-- 프로필 메뉴 시작 -->
    <v-menu class="d-flex flex-row justify-between">
      <template v-slot:activator="{ props: menu }">
        <v-btn icon="mdi-account-outline" v-bind="menu"></v-btn>
      </template>
      <!-- 인증이 안 된 상태의 메뉴 -->
      <v-list v-if="!authStore.isTokenExist">
        <v-list-item>
          <v-list-item-title class="cursor-pointer">고객센터</v-list-item-title>
          <v-divider class="my-2"></v-divider>
          <v-list-item-title
            @click="$router.push('/auth/sign-in')"
            class="cursor-pointer"
          >
            로그인
          </v-list-item-title>
          <v-divider class="my-2"></v-divider>
          <v-list-item-title class="cursor-pointer"
            >비회원 주문조회</v-list-item-title
          >
        </v-list-item>
      </v-list>

      <!-- 인증된 상태의 메뉴 -->
      <v-list v-else-if="authStore.isTokenExist">
        <v-list-item>
          <v-list-item-title
            @click="$router.push('/mypage')"
            class="cursor-pointer"
          >
            마이페이지
          </v-list-item-title>
          <v-divider class="my-2"></v-divider>
          <v-list-item-title
            @click="$router.push('/mypage/favorite')"
            class="cursor-pointer"
          >
            관심상품
          </v-list-item-title>
          <v-divider class="my-2"></v-divider>
          <v-list-item-title class="cursor-pointer">고객센터</v-list-item-title>
          <v-divider class="my-2"></v-divider>
          <v-list-item-title @click="executeLogout" class="cursor-pointer">
            로그아웃
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn icon="mdi-cart-outline" @click="goCart" />
  </v-app-bar>
  <!-- 프로필 메뉴 끝 -->
</template>

<script setup>
import { logout } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import { validateAuth } from '@/util/authUtil'

import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

//로그아웃 버튼 동작
const executeLogout = async () => {
  await logout()
}

const goCart = async () => {
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.push('/auth/sign-in')
    return
  }
  router.push('/cart')
}

const applyForArtist = async () => {
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.push('/auth/sign-in')
    return
  }
  router.push('/artist/goods/register')
}
</script>

<style lang="scss" scoped>
.top-logo {
  z-index: 100;
}

.menubar-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
</style>
