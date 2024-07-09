<template>
  <div class="container">
    <!-- 날짜 변경 (월 단위) -->
    <div class="d-flex justify-center align-center">
      <div class="d-flex justify-center align-center">
        <v-btn icon="mdi-chevron-left" flat @click="minusMonth" />
        <span>{{ year }} - {{ month }}</span>
        <v-btn icon="mdi-chevron-right" flat @click="plusMonth" />
      </div>
      <v-btn class="me-auto" flat color="primary">검색</v-btn>
    </div>
    <!-- 주문 목록 -->
    <section>
      <article v-for="order in requestedOrders" :key="order.goodsId">
        {{ order.goodsId }}
      </article>
    </section>
  </div>
</template>

<script setup>
import { getArtist } from '@/api/artist'
import { getRequestedOrderList } from '@/api/order'
import { useToastStore } from '@/stores/toast'
import { validateAuth } from '@/util/authUtil'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const toastStore = useToastStore()
const currentDate = new Date()

const year = ref(currentDate.getFullYear())
const month = ref(currentDate.getMonth() + 1)
const requestedOrders = ref([])

onBeforeMount(async () => {
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.replace('/auth/sign-in')
    return
  }

  const artist = await getArtist()
  if (!artist) {
    router.replace('/apply')
    return
  }

  requestedOrders.value = await getRequestedOrders()
})

const getRequestedOrders = async () => {
  return await getRequestedOrderList()
}

//연도 선택
const selectYear = (selectedYear) => {
  if (selectedYear < 0) {
    toastStore.useToast('날짜 형식이 맞지 않습니다.')
  }
  year.value = selectedYear
}

//월 선택
const selectMonth = (selectedMonth) => {
  const resultMonth = month.value + selectedMonth
  if (resultMonth > 12 || resultMonth < 1) {
    toastStore.useToast('날짜 형식이 맞지 않습니다.')
    return
  }
  month.value = selectedMonth
}

//다음달로 이동
const plusMonth = () => {
  month.value += 1
  if (month.value > 12) {
    month.value = 1
    year.value += 1
  }
}

//이전달로 이동
const minusMonth = () => {
  if (month.value - 1 < 1 && year.value - 1 < 2010) {
    toastStore.useToast('2010년 이후만 검색 가능합니다.')
    return
  }

  month.value -= 1
  if (month.value < 1) {
    month.value = 12
    year.value -= 1
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
}
</style>
