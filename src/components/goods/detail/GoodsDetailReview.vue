<template>
  <div>
    <div class="d-flex">
      <button class="review-btn">전체보기</button>
      <button class="review-btn">사진 리뷰</button>
    </div>
    <div class="content"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.review-btn {
  width: 50%;
  height: 50px;
  background-color: #fafaf9;
  border-top: 1px solid black;

  &:first-child {
    border-right: 1px solid #d3d3d3;
  }
}

.content {
  min-height: 100px;
  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
}
</style>
