<template>
  <v-app-bar class="elevation-1">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <!-- 상단 메인 로고 -->
    <v-app-bar-title class="menubar-title">
      <router-link to="/">
        <div class="top-logo">
          <h3>GOODSPIA</h3>
        </div>
      </router-link>
    </v-app-bar-title>

    <!-- 검색 아이콘 -->
    <v-btn icon="mdi-magnify"></v-btn>

    <!-- 프로필 메뉴 시작 -->
    <v-menu class="d-flex flex-row justify-between">
      <template v-slot:activator="{ props: menu }">
        <v-btn icon="mdi-account-outline" v-bind="menu"></v-btn>
      </template>
      <!-- 인증이 안 된 상태의 메뉴 -->
      <v-list v-if="!authStore.isTokenExist">
        <v-list-item>
          <v-list-item-title>고객센터</v-list-item-title>
          <v-divider class="my-2"></v-divider>
          <v-list-item-title @click="$router.push('/auth/sign-in')">
            로그인
          </v-list-item-title>
          <v-divider class="my-2"></v-divider>
          <v-list-item-title>비회원 주문조회</v-list-item-title>
        </v-list-item>
      </v-list>

      <!-- 인증된 상태의 메뉴 -->
      <v-list v-else-if="authStore.isTokenExist">
        <v-list-item>
          <v-list-item-title @click="$router.push('/mypage')">
            마이페이지
          </v-list-item-title>
          <v-divider class="my-2"></v-divider>
          <v-list-item-title @click="$router.push('/mypage/favorite')">
            관심상품
          </v-list-item-title>
          <v-divider class="my-2"></v-divider>
          <v-list-item-title>고객센터</v-list-item-title>
          <v-divider class="my-2"></v-divider>
          <v-list-item-title @click="executeLogout()">
            로그아웃
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn icon="mdi-cart-outline" @click="$router.push('/cart')" />
  </v-app-bar>
  <!-- 프로필 메뉴 끝 -->
</template>

<script setup>
import { logout } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

//로그아웃 버튼 동작
const executeLogout = async () => {
  await logout()
}
</script>

<style lang="scss" scoped>
.top-logo {
  z-index: 100;
}

.menubar-title {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
