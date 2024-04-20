<template>
  <div>
    <div class="d-flex">
      <button class="qna-btn qna-status">답변상태</button>

      <button class="qna-btn qna-title">제목</button>
      <button class="qna-btn qna-writer">작성자</button>
      <button class="qna-btn qna-date">작성일</button>
    </div>
    <div class="content"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.qna-btn {
  height: 50px;
  background-color: #fafaf9;
  border-top: 1px solid black;
  position: relative;
}

.qna-status {
  width: 35%;
}

.qna-title {
  width: 15%;
  border-left: 1px solid #d3d3d3;
}

.qna-writer {
  width: 25%;
  border-left: 1px solid #d3d3d3;
}

.qna-date {
  width: 25%;
  border-left: 1px solid #d3d3d3;
}

.content {
  min-height: 100px;
  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
}
</style>
