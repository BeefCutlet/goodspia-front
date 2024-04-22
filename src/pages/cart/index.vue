<template>
  <div>
    <OrderHeader step="CART" />
    <div class="d-flex justify-space-between px-10">
      <div class="cart-box">
        <section
          v-if="!cartList"
          class="d-flex flex-column justify-center align-center ga-5 empty-cart-box"
        >
          <v-icon icon="mdi-basket" size="50" />
          <p class="text-h6 font-weight-bold">장바구니가 비었어요</p>
        </section>
        <section v-else-if="!!cartList">
          <h2>굿즈피아 배송상품</h2>

          <!-- 전체 선택 -->
          <div class="d-flex align-center ga-3">
            <v-checkbox
              label="전체선택"
              v-model="isAllSelected"
              value="true"
              class="d-flex align-center"
            />
            <p>{{ selectedCarts.length }}/{{ cartList.length }}</p>
          </div>
          <v-divider class="my-4" />

          <!-- 장바구니 아이템 목록 -->
          <article v-for="(cartItem, index) in cartList" :key="cartItem.cartId">
            <div class="d-flex justify-space-between">
              <h3>{{ cartItem.artistNickname }}</h3>
              <v-btn
                outlined
                elevation="0"
                class="bg-primary"
                @click="deleteCartItem(cartItem.cartId)"
                >삭제
              </v-btn>
            </div>
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center justify-center">
                <v-checkbox
                  :value="index"
                  v-model="selectedCarts"
                  class="d-flex align-center"
                />
              </div>
              <div class="thumbnail-box">
                <v-img :src="cartItem.thumbnail" />
              </div>
              <div class="goods-info">
                <h3>
                  {{ cartItem.goodsName }}
                </h3>
                <p>디자인:&nbsp;{{ cartItem.designName }}</p>
                <p class="text-caption">판매가&nbsp;{{ cartItem.price }}원</p>
                <p class="text-caption">배송비&nbsp;3,000원</p>
              </div>
              <div>
                <div class="d-flex justify-center align-center ga-1">
                  <v-btn
                    icon="mdi-minus"
                    density="compact"
                    elevation="0"
                    @click="minusQuantity(cartItem.cartId)"
                  />
                  <p class="d-flex align-center text-h6">
                    {{ cartItem.quantity }}
                  </p>
                  <v-btn
                    icon="mdi-plus"
                    density="compact"
                    elevation="0"
                    @click="plusQuantity(cartItem.cartId)"
                  />
                </div>
                <h3>{{ cartItem.price * cartItem.quantity }}원</h3>
              </div>
            </div>
            <v-divider class="my-4" />
          </article>
        </section>
      </div>

      <!-- 선택 아이템 정보 -->
      <section class="total-info-box">
        <div class="d-flex justify-space-between">
          <h3>결제금액</h3>
          <h3>{{ totalGoodsPrice + deliveryCharge }}원</h3>
        </div>
        <v-divider class="my-3" />
        <div class="cart-result">
          <p>주문 상품 수</p>
          <p>
            <strong>{{ totalQuantity }}개</strong>
          </p>
        </div>
        <div class="cart-result">
          <p>총 주문금액</p>
          <p>
            <strong>{{ totalGoodsPrice }}원</strong>
          </p>
        </div>
        <div class="cart-result">
          <p>총 배송비</p>
          <p>
            <strong>{{ deliveryCharge }}원</strong>
          </p>
        </div>
        <div class="cart-result">
          <p>총 결제금액</p>
          <p>
            <strong>{{ totalGoodsPrice + deliveryCharge }}원</strong>
          </p>
        </div>
        <v-divider class="my-3" />
        <v-btn
          elevation="0"
          block
          class="bg-primary my-7"
          size="70"
          style="font-size: 21px; font-weight: bold"
          @click="addOrderItems"
        >
          주문하기
        </v-btn>
      </section>
    </div>
  </div>
</template>

<script setup>
import { deleteCart } from '@/api/cart'
import { changeCartGoodsQuantity, getCartList } from '@/api/cart'
import OrderHeader from '@/components/order/OrderHeader.vue'
import { validateAuth } from '@/util/authUtil'
import { watch } from 'vue'
import { onBeforeMount } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/**
 * 장바구니 목록 변수 - 리스트
 *
 * cartId : 장바구니 아이템 번호
 * quantity : 아이템 수량
 * goodsId : 굿즈 번호
 * artistNickname : 아티스트명
 * goodsName : 굿즈 이름
 * designName : 디자인 이름
 * price : 아이템 가격
 * thumbnail : 아이템 썸네일
 */
const cartList = ref([])
//장바구니 목록 조회 함수
const getCarts = async () => {
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.replace('/auth/sign-in')
    return null
  }
  return await getCartList()
}
//장바구니 목록 조회
onBeforeMount(async () => {
  cartList.value = await getCarts()
})

//장바구니 굿즈 수량 증가 함수
const plusQuantity = (cartId) => {
  cartList.value.forEach((cartItem) => {
    if (cartItem.cartId === cartId && cartItem.quantity < 999) {
      cartItem.quantity++
      changeCartGoodsQuantity(cartId, cartItem.quantity)
    }
  })
}

//장바구니 굿즈 수량 감소 함수
const minusQuantity = (cartId) => {
  cartList.value.forEach((cartItem) => {
    if (cartItem.cartId === cartId && cartItem.quantity > 1) {
      cartItem.quantity--
      changeCartGoodsQuantity(cartId, cartItem.quantity)
    }
  })
}

//장바구니 굿즈 아이템 삭제
const deleteCartItem = (cartId) => {
  cartList.value.forEach((cartItem, index) => {
    if (cartItem.cartId === cartId) {
      if (confirm('상품을 제거하시겠습니까?')) {
        cartList.value.splice(index, 1)
        deleteCart(cartId)
      }
    }
  })
}

//선택된 장바구니 내 굿즈의 인덱스 리스트
const selectedCarts = ref([])
//전체 선택 여부
const isAllSelected = ref([])
//주문 상품 수
const totalQuantity = ref(0)
//총 주문 금액
const totalGoodsPrice = ref(0)
//총 배송비
const deliveryCharge = ref(0)

//선택한 굿즈 정보를 주문 정보에 반영하는 함수
const calculateOrderInfo = (indexList) => {
  resetOrderInfo()
  indexList.forEach((index) => {
    const cart = cartList.value[index]
    totalQuantity.value += cart.quantity
    totalGoodsPrice.value += cart.price * cart.quantity
  })
  deliveryCharge.value = 3000
}

//주문 정보 초기화 함수
const resetOrderInfo = () => {
  totalQuantity.value = 0
  totalGoodsPrice.value = 0
  deliveryCharge.value = 0
}

//전체 선택 토글 - 체크 시 전체 선택, 언체크 시 전체 해제
watch(
  () => isAllSelected.value,
  (selectStatus) => {
    if (selectStatus.length != 0) {
      cartList.value.forEach((cart, index) => {
        selectedCarts.value.push(index)
      })
      selectedCarts.value = [...new Set(selectedCarts.value)]
    } else {
      selectedCarts.value = []
    }
  },
)

//장바구니 굿즈 선택 이벤트 발생 시 동작 함수
//=> 주문 정보에 반영
watch(
  () => selectedCarts.value,
  (selectedCartList) => {
    if (selectedCartList.length != 0) {
      //선택된 굿즈 개수에 따라 전체 선택 토글 선택/해제
      if (
        selectedCartList.length === cartList.value.length &&
        isAllSelected.value.length == 0
      ) {
        isAllSelected.value.push('true')
      } else if (selectedCartList.length !== cartList.value.length) {
        isAllSelected.value.pop()
      }
      //선택한 굿즈가 있을 때, 주문 정보에 반영
      calculateOrderInfo(selectedCartList)
    } else {
      //선택한 굿즈가 없을 때, 주문 정보 초기화
      resetOrderInfo()
    }
  },
)

//주문 목록에 추가
const addOrderItems = () => {
  if (selectedCarts.value.length === 0) {
    //TODO: "주문할 상품을 선택해주세요." 알림 설정
    return
  }
  const orderItems = []
  selectedCarts.value.forEach((index) => {
    orderItems.push(cartList.value[index])
  })
  localStorage.setItem('goodspia_order_items', JSON.stringify(orderItems))
  router.push('/order')
}
</script>

<style lang="scss" scoped>
.empty-cart-box {
  height: 200px;
}

.cart-box {
  width: 850px;
}

.thumbnail-box {
  width: 120px;
}

.cart-result {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #a2a2a2;
}

.goods-info {
  width: 500px;
  line-height: 2;
}

.total-info-box {
  width: 400px;
}
</style>
