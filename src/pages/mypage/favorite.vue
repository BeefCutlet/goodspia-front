<template>
  <div>
    <MypageMenuDetail :member-name="memberInfo.name">
      <!-- 마이페이지 제목 -->
      <template #title>
        <router-link to="/mypage">
          <h2 class="header my-6">
            <v-icon icon="mdi-chevron-left" />관심상품
          </h2>
        </router-link>
      </template>

      <!-- 마이페이지 내용 -->
    </MypageMenuDetail>

    <!-- 찜 목록 -->
    <section class="mt-10 item-center">
      <WishCardList :items="wishListInfo.wishList" />
    </section>
  </div>
</template>

<script setup>
import MypageMenuDetail from '@/components/mypage/MypageMenuDetail.vue'
import WishCardList from '@/components/wish/WishCardList.vue'

import { onMounted, ref } from 'vue'
import { validateAuth } from '@/util/authUtil'
import { useRouter } from 'vue-router'
import { getMember } from '@/api/member'
import { getWishList } from '@/api/wish'

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

/**
 * 찜 목록 조회
 */
const wishListInfo = ref({})
const getWishes = async () => {
  const wishList = await getWishList()
  wishListInfo.value = wishList
}

onMounted(async () => {
  await getMemberInfo()
  await getWishes()
})
</script>

<style lang="scss" scoped></style>
