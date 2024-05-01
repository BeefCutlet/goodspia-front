<template>
  <div>
    <OrderHeader step="ORDER" />
    <div class="d-flex justify-space-between">
      <OrdererInfo :member-info="memberInfo" />
      <OrderGoodsInfo />
    </div>
  </div>
</template>

<script setup>
import OrderHeader from '@/components/order/OrderHeader.vue'
import OrderGoodsInfo from '@/components/order/OrderGoodsInfo.vue'
import OrdererInfo from '@/components/order/OrdererInfo.vue'
import { onMounted } from 'vue'
import { validateAuth } from '@/util/authUtil'
import { useRouter } from 'vue-router'
import { getMember } from '@/api/member'
import { ref } from 'vue'

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
const memberInfo = ref()
const getMemberInfo = async () => {
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.replace('/auth/sign-in')
    return null
  }
  memberInfo.value = await getMember()
}

onMounted(() => {
  getMemberInfo()
})
</script>

<style lang="scss" scoped></style>
