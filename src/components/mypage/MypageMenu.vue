<template>
  <div class="container d-flex justify-space-between my-10">
    <section class="menu-section">
      <p><strong>쇼핑정보</strong></p>
      <router-link to="/mypage/profile/edit">
        <div class="d-flex justify-space-between align-center">
          <p>회원정보 관리</p>
          <v-icon icon="mdi-chevron-right" />
        </div>
      </router-link>
      <router-link to="/mypage">
        <div class="d-flex justify-space-between align-center">
          <p>배송지 관리</p>
          <v-icon icon="mdi-chevron-right" />
        </div>
      </router-link>
      <router-link to="/mypage/favorite">
        <div class="d-flex justify-space-between align-center">
          <p>관심상품</p>
          <v-icon icon="mdi-chevron-right" />
        </div>
      </router-link>
      <router-link to="/mypage">
        <div class="d-flex justify-space-between align-center">
          <p>팔로우</p>
          <v-icon icon="mdi-chevron-right" />
        </div>
      </router-link>
      <router-link to="/mypage">
        <div class="d-flex justify-space-between align-center">
          <p>쿠폰</p>
          <v-icon icon="mdi-chevron-right" />
        </div>
      </router-link>
      <router-link to="/mypage">
        <div class="d-flex justify-space-between align-center">
          <p>마일리지</p>
          <v-icon icon="mdi-chevron-right" />
        </div>
      </router-link>
    </section>
    <section class="menu-section">
      <p><strong>고객센터</strong></p>
      <router-link to="/mypage">
        <div class="d-flex justify-space-between align-center">
          <p>상품 Q&A</p>
          <v-icon icon="mdi-chevron-right" />
        </div>
      </router-link>
      <router-link to="/mypage">
        <div class="d-flex justify-space-between align-center">
          <p>1:1 문의</p>
          <v-icon icon="mdi-chevron-right" />
        </div>
      </router-link>
      <router-link to="/mypage">
        <div class="d-flex justify-space-between align-center">
          <p>내 리뷰</p>
          <v-icon icon="mdi-chevron-right" />
        </div>
      </router-link>
    </section>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
strong {
  font-size: 21px;
}

.menu-section {
  width: 45%;
  line-height: 2.5;
}
</style>
