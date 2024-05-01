<template>
  <div class="container ma-10">
    <v-list class="text-center">
      <h2 class="mb-2">아티스트 메뉴</h2>
      <v-list-item prepend-icon="mdi-phone">
        <v-list-item-title
          @click="$router.push('/artist')"
          class="cursor-pointer"
        >
          프로필
        </v-list-item-title>
      </v-list-item>

      <v-divider inset />

      <v-list-item prepend-icon="mdi-phone">
        <v-list-item-title
          @click="$router.push('/artist/goods/register')"
          class="cursor-pointer"
        >
          굿즈 등록
        </v-list-item-title>
      </v-list-item>

      <v-divider inset />

      <v-list-item prepend-icon="mdi-phone">
        <v-list-item-title
          @click="$router.push('/artist/goods/my-list')"
          class="cursor-pointer"
        >
          내 굿즈
        </v-list-item-title>
      </v-list-item>

      <v-divider inset />

      <v-list-item prepend-icon="mdi-phone">
        <v-list-item-title
          @click="$router.push('/artist/goods/orders')"
          class="cursor-pointer"
        >
          주문 목록
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  width: 350px;
  height: 350px;
  position: sticky;
  top: 150px;

  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
}
</style>
