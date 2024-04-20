<template>
  <div>
    <slot name="title"></slot>
    <div class="container">
      <p>
        <strong>{{ memberName }}</strong>
        님, 안녕하세요
      </p>

      <!-- 쿠폰, 마일리지, 하트 -->
      <div class="d-flex justify-center my-4">
        <div class="coupon-summary">
          <p class="text-caption">쿠폰</p>
          <p><strong>0</strong>&nbsp;장</p>
        </div>
        <div class="mileage-summary">
          <p class="text-caption">마일리지</p>
          <p><strong>0</strong>&nbsp;원</p>
        </div>
        <div class="heart-summary">
          <p class="text-caption">하트</p>
          <p><strong>7</strong>&nbsp;개</p>
        </div>
      </div>

      <!-- 주문배송내역 -->
      <div class="mt-10">
        <p>
          <strong>주문배송내역</strong>
          <span class="text-caption mx-3">(최근 3개월 기준)</span>
        </p>
        <div class="d-flex justify-space-around shipping-status-box my-4">
          <div class="d-flex justify-space-between align-center ga-4">
            <p>상품준비중</p>
            <p><span>0</span></p>
          </div>
          <div class="d-flex justify-space-between align-center ga-4">
            <p>배송준비중</p>
            <p><span>0</span></p>
          </div>
          <div class="d-flex justify-space-between align-center ga-4">
            <p>배송대기</p>
            <p><span>0</span></p>
          </div>
          <div class="d-flex justify-space-between align-center ga-4">
            <p>배송중</p>
            <p><span>0</span></p>
          </div>
          <div class="d-flex justify-space-between align-center ga-4">
            <p>배송완료</p>
            <p><span>0</span></p>
          </div>
        </div>
      </div>

      <!-- 취소/교환/반품, 구매확정 -->
      <div class="d-flex">
        <button class="cancel-menu">취소/교환/반품<span>0</span></button>
        <button class="complete-menu">구매확정<span>0</span></button>
      </div>
    </div>

    <!-- 마이페이지 내용 -->
    <slot name="content"></slot>
  </div>
</template>

<script setup>
defineProps({
  memberName: String,
})
</script>

<style lang="scss" scoped>
@import '../../styles/mypage/mypage-header.scss';
</style>
