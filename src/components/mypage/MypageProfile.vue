<template>
  <div class="profile my-10">
    <h3>회원정보 수정</h3>
    <div class="content">
      <p class="tag">이메일</p>
      <p>{{ email }}</p>
    </div>
    <div class="content">
      <p class="tag">닉네임</p>
      <input
        type="text"
        class="input-style"
        placeholder="닉네임을 입력해주세요."
        :value="nickname"
        @input="$emit('update:nickname', $event.target.value)"
      />
    </div>
    <div class="content">
      <p class="tag">이름</p>
      <input
        type="text"
        class="input-style"
        placeholder="이름을 입력해주세요."
        :value="name"
        @input="$emit('update:name', $event.target.value)"
      />
    </div>
    <div class="content">
      <p class="tag">휴대폰번호</p>
      <input
        type="text"
        class="input-style"
        :value="phoneNumber.split('-')[0]"
        @input="$emit('update:phoneFirst', $event.target.value)"
      />-
      <input
        type="text"
        class="input-style"
        :value="phoneNumber.split('-')[1]"
        @input="$emit('update:phoneSecond', $event.target.value)"
      />-
      <input
        type="text"
        class="input-style"
        :value="phoneNumber.split('-')[2]"
        @input="$emit('update:phoneThird', $event.target.value)"
      />
    </div>
    <div class="content">
      <p class="tag">생년월일</p>
      <input
        type="text"
        class="input-style"
        :value="birthday.split('-')[0]"
        @input="$emit('update:birthYear', $event.target.value)"
      />년&nbsp;
      <input
        type="text"
        class="input-style"
        :value="birthday.split('-')[1]"
        @input="$emit('update:birthMonth', $event.target.value)"
      />월&nbsp;
      <input
        type="text"
        class="input-style"
        :value="birthday.split('-')[2]"
        @input="$emit('update:birthDate', $event.target.value)"
      />일&nbsp;
    </div>
    <div class="d-flex justify-end align-center ga-5 my-5">
      <v-btn variant="tonal" to="/mypage">취소</v-btn>
      <v-btn variant="flat" color="primary">완료</v-btn>
    </div>
  </div>
</template>

<script setup>
defineProps({
  email: String,
  nickname: String,
  name: String,
  phoneNumber: String,
  birthday: String,
})

defineEmits([
  'update:nickname',
  'update:name',
  'update:phoneFirst',
  'update:phoneSecond',
  'update:phoneThrid',
  'update:birthYear',
  'update:birthMonth',
  'update:birthDate',
])
</script>

<style lang="scss" scoped>
.profile {
  line-height: 3;
}

.input-style {
  width: 200px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  text-indent: 12px;

  &::placeholder {
    font-size: 14px;
    color: #a2a2a2;
    text-indent: 12px;
  }
}

.content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.tag {
  width: 100px;
}
</style>
