<template>
  <div class="container">
    <MypageMenuDetail :member-name="memberInfo.name" class="mypage-detail">
      <!-- 마이페이지 제목 -->
      <template #title>
        <router-link to="/mypage">
          <h2 class="header my-6">마이페이지</h2>
        </router-link>
      </template>

      <!-- 마이페이지 내용 - 프로필 수정 -->
      <template #content>
        <div class="profile my-10">
          <h3>회원정보 수정</h3>
          <div class="content">
            <p class="tag">이메일</p>
            <p>{{ memberInfo.email }}</p>
          </div>
          <div class="content">
            <p class="tag">닉네임</p>
            <input
              type="text"
              class="input-style"
              placeholder="닉네임을 입력해주세요."
              :value="memberInfo.nickname"
              @input="(event) => (memberInfo.nickname = event.target.value)"
            />
          </div>
          <div class="content">
            <p class="tag">이름</p>
            <input
              type="text"
              class="input-style"
              placeholder="이름을 입력해주세요."
              :value="memberInfo.name"
              @input="(event) => (memberInfo.name = event.target.value)"
            />
          </div>
          <div class="content">
            <p class="tag">휴대폰번호</p>
            <input
              type="text"
              class="input-style"
              :value="phoneFirst"
              @input="(event) => (phoneFirst = event.target.value)"
            />-
            <input
              type="text"
              class="input-style"
              :value="phoneSecond"
              @input="(event) => (phoneSecond = event.target.value)"
            />-
            <input
              type="text"
              class="input-style"
              :value="phoneThird"
              @input="(event) => (phoneThird = event.target.value)"
            />
          </div>
          <div class="content">
            <p class="tag">생년월일</p>
            <input
              type="text"
              class="input-style"
              :value="birthYear"
              @input="(event) => (birthYear = event.target.value)"
            />년&nbsp;
            <input
              type="text"
              class="input-style"
              :value="birthMonth"
              @input="(event) => (birthMonth = event.target.value)"
            />월&nbsp;
            <input
              type="text"
              class="input-style"
              :value="birthDate"
              @input="(event) => (birthDate = event.target.value)"
            />일&nbsp;
          </div>
          <div class="d-flex justify-end align-center ga-5 my-5">
            <v-btn variant="tonal" to="/mypage">취소</v-btn>
            <v-btn variant="flat" color="primary" @click="editProfile"
              >완료</v-btn
            >
          </div>
        </div>
      </template>
    </MypageMenuDetail>
  </div>
</template>

<script setup>
import MypageMenuDetail from '@/components/mypage/MypageMenuDetail.vue'

import { onBeforeMount, ref } from 'vue'
import { validateAuth } from '@/util/authUtil'
import { useRouter } from 'vue-router'
import { getMember, updateMember } from '@/api/member'

const router = useRouter()

/**
 * 회원 정보
 *
 * email: 회원 이메일
 * nickname: 회원 닉네임
 * name: 회원 이름
 * gender: 성별
 * phoneNumber: 전화번호
 * birthday: 생년월일
 * address.zipcode: 우편번호
 * address.address1: 기본주소
 * address.address2: 상세주소
 */
const memberInfo = ref({})
const phoneFirst = ref('')
const phoneSecond = ref('')
const phoneThird = ref('')

const birthYear = ref('')
const birthMonth = ref('')
const birthDate = ref('')

//회원 정보 조회
const getMemberInfo = async () => {
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.push('/auth/sign-in')
    return null
  }
  return await getMember()
}

onBeforeMount(async () => {
  memberInfo.value = await getMemberInfo()

  const phone = memberInfo.value.phoneNumber.split('-')
  console.log('phone: ', phone)
  phoneFirst.value = phone[0]
  phoneSecond.value = phone[1]
  phoneThird.value = phone[2]

  const birth = memberInfo.value.birthday.split('-')
  console.log('birth: ', birth)
  birthYear.value = birth[0]
  birthMonth.value = birth[1]
  birthDate.value = birth[2]
})

//회원 정보 수정 이벤트 처리 함수
const editProfile = async () => {
  console.log('회원 정보 수정 시도')
  const member = {
    name: memberInfo.value.name,
    nickname: memberInfo.value.nickname,
    phoneNumber:
      phoneFirst.value + '-' + phoneSecond.value + '-' + phoneThird.value,
    birthday: birthYear.value + '-' + birthMonth.value + '-' + birthDate.value,
  }

  console.log('member: ', { ...member })
  const isSuccess = await updateMember({ ...member })
  if (isSuccess) {
    console.log('회원 정보 수정 성공')
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 900px;

  &:deep(.profile) {
    line-height: 3;

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
  }
}
</style>
