<template>
  <div class="container">
    <MypageMenuDetail :member-name="memberInfo.name">
      <!-- 마이페이지 제목 -->
      <template #title>
        <router-link to="/mypage">
          <h2 class="header my-6">마이페이지</h2>
        </router-link>
      </template>

      <!-- 마이페이지 내용 -->
      <template #content>
        <div class="menu d-flex justify-space-between my-10">
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
            <router-link to="/mypage/coupon">
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
    </MypageMenuDetail>
  </div>
</template>

<script setup>
import MypageMenuDetail from '@/components/mypage/MypageMenuDetail.vue'

import { onMounted, ref } from 'vue'
import { validateAuth } from '@/util/authUtil'
import { useRouter } from 'vue-router'
import { getMember } from '@/api/member'

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
const getMemberInfo = async () => {
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.push('/auth/sign-in')
    return null
  }
  memberInfo.value = await getMember()
}

onMounted(() => {
  getMemberInfo()
})
</script>

<style lang="scss" scoped>
.container {
  &:deep(.menu) {
    strong {
      font-size: 21px;
    }

    .menu-section {
      width: 45%;
      line-height: 2.5;
    }
  }
}
</style>
