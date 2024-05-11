<template>
  <div class="d-flex flex-column justify-lg-space-around ga-6">
    <div class="d-flex justify-space-between">
      <div>
        <h1 class="font-weight-bold mb-4">
          <!-- 굿즈 이름 -->
          {{ goodsItem.name }}
        </h1>
        <h2 class="font-weight-bold">
          <!-- 굿즈 가격 -->
          {{ goodsItem.price }}원
        </h2>
      </div>
      <div class="d-flex flex-column justify-center align-center">
        <v-btn
          variant="flat"
          :icon="!!wishStatus ? 'mdi-cards-heart' : 'mdi-cards-heart-outline'"
          @click="$emit('toggleWish')"
        />
        <span class="text-caption">{{ goodsItem.wishCount }}</span>
      </div>
    </div>
    <v-divider />
    <div>
      <div>
        <p>배송비 | 3,000원</p>
      </div>
    </div>
    <v-divider />
    <div>
      <div>
        <p class="subtitle">디자인</p>
        <v-select
          variant="outlined"
          label="Select..."
          :items="goodsDesigns"
          item-value="props"
          v-model="selectedDesign"
        ></v-select>
      </div>
    </div>

    <!-- 선택한 굿즈 목록 -->
    <div v-for="design in selectedDesignList" :key="design.designId">
      <v-divider class="mb-7" />
      <!-- 선택한 굿즈 컴포넌트 추가 -->
      <SelectedGoodsDesign
        :design-name="design.designName"
        :price="goodsItem.price"
        :quantity="design.quantity"
        :design-id="design.designId"
        @update-plus:quantity="plusQuantity"
        @update-minus:quantity="minusQuantity"
        @delete:design="deleteDesign"
      />
    </div>

    <v-divider />

    <div class="d-flex justify-space-between align-center mb-3">
      <p>총 상품 금액</p>
      <p>
        총 수량 개수 {{ totalQuantity }}개 &nbsp;|&nbsp;
        <b class="text-h6 font-weight-bold"
          >{{ totalQuantity * goodsItem.price }}원</b
        >
      </p>
    </div>
    <div class="d-flex flex-column justify-space-around mb-5 ga-3">
      <v-btn variant="outlined" color="primary" block @click="addCarts">
        장바구니
      </v-btn>
      <v-btn variant="flat" color="primary" block @click="addOrders">
        구매하기
      </v-btn>
    </div>
    <v-divider />
    <div class="d-flex mb-3 ga-2">
      <div>배송기간</div>
      <div class="text-caption">
        해당 상품은 주문 제작 상품으로 배송까지 2~3주 이상 소요될 수 있습니다.
      </div>
    </div>
    <div class="d-flex mb-3 ga-2">
      <div>배송안내</div>
      <div class="text-caption">
        기간 한정 상품의 경우, 판매 종료일 기준으로 제작 기간이 소요됩니다.<br />제조사
        및 배송사 사정에 따라 배송일이 변경될 수 있습니다.<br />주문제작 상품
        특성상 단순 변심으로 인한 교환 및 반품은 불가합니다.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { addCartList } from '@/api/cart'
import { useRouter } from 'vue-router'
import { validateAuth } from '@/util/authUtil'

import SelectedGoodsDesign from './SelectedGoodsDesign.vue'

const props = defineProps({
  goodsItem: {
    type: Object,
  },
  goodsDesigns: {
    type: Array,
  },
  wishStatus: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggleWish'])

const router = useRouter()

//총 수량
const totalQuantity = ref(0)
//선택된 디자인
const selectedDesign = ref()
//선택된 디자인 목록 - 장바구니, 주문 데이터 전달 시 이용
const selectedDesignList = ref([])

//디자인 선택 후 목록에 추가
watch(selectedDesign, () => {
  addDesign(selectedDesign.value)
})

//주문 정보 초기화
const resetOrderInfo = () => {
  totalQuantity.value = 0
}

//주문 정보 재계산
const calculateOrderInfo = () => {
  resetOrderInfo()
  selectedDesignList.value.forEach((selectedDesignInfo) => {
    totalQuantity.value += selectedDesignInfo.quantity
  })
}

//디자인 선택 시 동작
//선택된 디자인 목록에 디자인 정보 추가
//화면에 디자인 정보를 담은 블록 추가 (반응형)
const addDesign = (design) => {
  if (design === null) {
    return
  }
  const designId = design.designId
  const designName = design.designName
  console.log('designId: ', designId)
  const designInfo = {
    designId,
    designName,
    quantity: 1,
  }

  //이미 선택한 디자인이면 취소
  selectedDesignList.value.forEach((selectedDesignInfo) => {
    if (selectedDesignInfo.designId === designId) {
      return
    }
  })

  //선택하지 않은 디자인이면 추가
  selectedDesignList.value.push(designInfo)
  totalQuantity.value++
}

//선택된 디자인에서 수량 더하기 버튼 클릭 시 동작
const plusQuantity = (designId) => {
  //선택된 디자인 중 디자인 아이디가 일치하는 굿즈의 수량을 증가
  //999보다 클 수 없음
  selectedDesignList.value.forEach((design) => {
    if (design.designId === designId && design.quantity < 999) {
      design.quantity++
      totalQuantity.value++
      return
    }
  })
}

//선택된 디자인에서 수량 빼기 버튼 클릭 시 동작
const minusQuantity = (designId) => {
  //선택된 디자인 중 디자인 아이디가 일치하는 굿즈의 수량을 감소
  //1보다 작을 수 없음
  selectedDesignList.value.forEach((design) => {
    if (design.designId === designId && design.quantity > 1) {
      design.quantity--
      totalQuantity.value--
      return
    }
  })
}

//선택된 디자인 삭제
const deleteDesign = (designId) => {
  selectedDesignList.value.forEach((design, index) => {
    if (design.designId === designId) {
      selectedDesignList.value.splice(index, 1)
      selectedDesign.value = null
      calculateOrderInfo()
    }
  })
}

//장바구니 등록
const addCarts = async () => {
  let isSuccess = await validateAuth()
  if (!isSuccess) {
    if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
      router.push('/auth/sign-in')
    }
    return
  }

  //저장할 장바구니 목록
  const cartList = createCartList()
  console.log('cartList:', cartList)

  //장바구니에 선택한 굿즈를 저장
  isSuccess = await addCartList(cartList)
  if (isSuccess) {
    if (
      confirm(
        '장바구니에 상품이 정상적으로 담겼습니다. 장바구니로 이동하시겠습니까?',
      )
    ) {
      router.push('/cart')
    }
  }
}

//장바구니에 저장할 굿즈 디자인 목록
const createCartList = () => {
  const tempCartList = []
  selectedDesignList.value.forEach((design) => {
    tempCartList.push({
      quantity: design.quantity,
      goodsId: props.goodsItem.goodsId,
      designId: design.designId,
    })
  })
  return {
    cartList: tempCartList,
  }
}

/**
 * 주문 목록에 선택한 아이템 추가
 * 주문하기 버튼 클릭 시 동작
 *
 * quantity : 아이템 수량
 * goodsId : 굿즈 번호
 * artistNickname : 아티스트명
 * goodsName : 굿즈 이름
 * designName : 디자인 이름
 * price : 아이템 가격
 * thumbnail : 아이템 썸네일
 */
const addOrders = () => {
  if (selectedDesignList.value.length === 0) {
    //TODO: "주문할 상품을 선택해주세요." 알림 설정
    return
  }
  const orderItems = []
  selectedDesignList.value.forEach((selectedDesignInfo) => {
    orderItems.push({
      quantity: selectedDesignInfo.quantity,
      goodsId: props.goodsItem.goodsId,
      artistNickname: props.goodsItem.artistNickname,
      goodsName: props.goodsItem.name,
      designName: selectedDesignInfo.designName,
      price: props.goodsItem.price,
      thumbnail: props.goodsItem.thumbnail,
    })
  })
  localStorage.setItem('goodspia_order_items', JSON.stringify(orderItems))
  router.push('/order')
}
</script>

<style lang="scss" scoped>
.subtitle {
  font-weight: 700;
  font-size: large;
  margin-bottom: 10px;
}
</style>
