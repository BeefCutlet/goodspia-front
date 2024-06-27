<template>
  <div>
    <MypageMenuDetail :member-name="memberInfo.name">
      <!-- 마이페이지 제목 -->
      <template #title>
        <router-link to="/mypage">
          <h2 class="header my-6">마이페이지</h2>
        </router-link>
      </template>

      <!-- 마이페이지 내용 -->
      <template #content>
        <CouponCardList :coupons="couponList" />
      </template>
    </MypageMenuDetail>
  </div>
</template>

<script setup>
import MypageMenuDetail from '@/components/mypage/MypageMenuDetail.vue'
import CouponCardList from '@/components/coupon/CouponCardList.vue'
import { onMounted, ref } from 'vue'
import { getCouponList } from '@/api/coupon'
import { validateAuth } from '@/util/authUtil'
import { getMember } from '@/api/member'
import { useRouter } from 'vue-router'

const router = useRouter()

const couponList = ref([])
const memberInfo = ref({
  name: '',
})

//쿠폰 정보 조회
const getCoupons = async () => {
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.push('/auth/sign-in')
    return
  }
  const couponList = await getCouponList()
  console.log('couponList: ', couponList)
  return couponList
}

//회원 정보 조회
const getMemberInfo = async () => {
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.push('/auth/sign-in')
    return {
      name: '',
    }
  }
  return await getMember()
}

onMounted(async () => {
  memberInfo.value = await getMemberInfo()
  couponList.value = await getCoupons()
})
</script>

<style lang="scss" scoped></style>
