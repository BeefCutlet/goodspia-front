<template>
  <div class="pa-10 d-flex flex-column ga-5 container">
    <h1>굿즈 등록</h1>
    <!-- 썸네일 이미지 표시 -->
    <div
      class="d-flex flex-column ga-5 justify-center align-center my-5 thumbnail-box"
    >
      <h2 class="align-self-start">썸네일</h2>
      <label for="thumbnailImage" class="thumbnail-label">
        <img
          :src="thumbnailUrl"
          class="thumbnail"
          style="cursor: pointer; position: relative"
        />
      </label>
    </div>
    <!-- 썸네일 이미지 추가 -->
    <div style="display: none">
      <input
        id="thumbnailImage"
        type="file"
        @input="(event) => (thumbnail = event.target.files[0])"
      />
    </div>

    <!-- 굿즈명 입력 -->
    <div class="d-flex align-center">
      <p class="tag">굿즈명</p>
      <input
        type="text"
        placeholder="굿즈 이름을 입력해주세요."
        class="goods-info-input"
        :value="goodsName"
        @input="(event) => (goodsName = event.target.value)"
      />
    </div>

    <!-- 굿즈 가격 입력 -->
    <div class="d-flex align-center">
      <p class="tag">가격</p>
      <input
        type="text"
        placeholder="가격을 입력해주세요."
        class="goods-info-input"
        :value="price"
        @input="(event) => (price = event.target.value)"
      />
    </div>

    <!-- 굿즈 수량 입력 - 공백 또는 0이면, 무한으로 취급 -->
    <div class="d-flex align-center">
      <p class="tag">수량</p>
      <div class="d-flex justify-space-between align-center">
        <input
          type="text"
          placeholder="1 이상의 수 입력"
          class="goods-quantity-input"
          :value="stock"
          @input="(event) => (stock = event.target.value)"
          :disabled="!isLimited"
        />
        <v-btn
          v-if="!!isLimited"
          @click="toggleLimited"
          variant="flat"
          color="secondary"
          class="mx-3"
        >
          수량제한 없음
        </v-btn>
        <v-btn
          v-else-if="!isLimited"
          @click="toggleLimited"
          variant="flat"
          color="error"
          class="mx-3"
        >
          수량제한 있음
        </v-btn>
      </div>
    </div>

    <!-- 소재 입력 -->
    <div class="d-flex align-center">
      <p class="tag">소재</p>
      <input
        type="text"
        placeholder="굿즈의 소재를 입력해주세요."
        class="goods-info-input"
        :value="material"
        @input="(event) => (material = event.target.value)"
      />
    </div>

    <!-- 사이즈 입력 -->
    <div class="d-flex align-center">
      <p class="tag">사이즈</p>
      <input
        type="text"
        placeholder="굿즈의 사이즈를 입력해주세요."
        class="goods-info-input"
        :value="size"
        @input="(event) => (size = event.target.value)"
      />
    </div>

    <!-- 디자인 추가 -->
    <div class="d-flex align-center">
      <p class="tag">디자인</p>
      <div class="d-flex flex-column">
        <div
          class="d-flex align-center ga-3"
          v-for="(design, index) in designs"
          :key="index"
        >
          <v-btn
            icon="mdi-minus"
            variant="plain"
            color="error"
            @click="removeDesignInput(index)"
          />
          <input
            type="text"
            placeholder="디자인을 추가해주세요."
            class="goods-design-input"
            :value="design"
            @input="(event) => (designs[index] = event.target.value)"
          />
          <v-btn
            icon="mdi-plus"
            variant="plain"
            color="primary"
            @click="addDesignInput"
          />
        </div>
      </div>
    </div>

    <!-- 굿즈 내용 이미지 추가 -->
    <div class="d-flex flex-column ga-5 my-5">
      <h2>굿즈 상세 이미지</h2>
      <v-file-input
        accept="image/*"
        label="상세이미지"
        @input="(event) => (contentImage = event.target.files[0])"
        :on-click:clear="removeContentImage"
      />
      <v-btn variant="flat" color="secondary" @click="showPreview">
        미리보기
      </v-btn>
    </div>
    <!-- 굿즈 미리보기 모달 -->
    <GoodsContentDialog
      v-model="isPreviewOpen"
      @update:is-preview-open="closePreview"
      :content-image-url="contentImageUrl"
      :designs="designs"
      :goods-name="goodsName"
      :material="material"
      :size="size"
    />

    <!-- 등록 버튼 -->
    <div class="d-flex justify-end align-center ga-5 my-5">
      <v-btn variant="tonal" @click="">초기화</v-btn>
      <v-btn variant="flat" color="primary" @click="addGoods">등록</v-btn>
    </div>
  </div>
</template>

<script setup>
import { getArtist } from '@/api/artist'
import { registerGoods } from '@/api/goods'
import { validateAuth } from '@/util/authUtil'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import GoodsContentDialog from '@/components/goods/mypage/GoodsContentDialog.vue'
import { watch } from 'vue'

const router = useRouter()

//초기값
const goodsName = ref('')
const price = ref(1000)
const stock = ref(0)
const material = ref('')
const size = ref('')
const designs = ref([''])

//굿즈 내용 변수
const contentImageUrl = ref('')
const contentImage = ref()
watch(contentImage, (newContentImage) => {
  contentImageUrl.value = !!newContentImage
    ? URL.createObjectURL(newContentImage)
    : ''
})
const thumbnailUrl = ref(import.meta.env.VITE_BASIC_PROFILE_IMAGE)
const thumbnail = ref()
watch(thumbnail, (newThumbnail) => {
  thumbnailUrl.value = !!newThumbnail
    ? URL.createObjectURL(newThumbnail)
    : import.meta.env.VITE_BASIC_PROFILE_IMAGE
})

//수량 제한 존재 여부
const isLimited = ref(true)
const toggleLimited = () => {
  isLimited.value = !isLimited.value
  if (!isLimited.value) {
    stock.value = 0
  }
}

onBeforeMount(async () => {
  //인증
  const isSuccess = await validateAuth()
  if (!isSuccess) {
    router.replace('/auth/sign-in')
    return
  }

  //아티스트 등록 여부 조회
  const artist = await getArtist()
  if (!artist) {
    router.replace('/apply')
    return
  }
})

//디자인 input 추가
const addDesignInput = () => {
  let isFull = true
  designs.value.forEach((design) => {
    if (design === '') {
      isFull = false
      return
    }
  })
  if (isFull) {
    designs.value.push('')
  }
}

//디자인 input 제거
const removeDesignInput = (index) => {
  if (designs.value.length === 1) {
    return
  }
  designs.value.splice(index, 1)
}

//굿즈 등록 - 등록 버튼 클릭 시 이벤트
const addGoods = async () => {
  if (!validateGoods()) {
    return
  }

  const goodsFormData = new FormData()
  const goods = {
    name: goodsName.value,
    price: price.value,
    stock: stock.value,
    material: material.value,
    size: size.value,
    isLimited: isLimited.value,
    designs: designs.value,
  }

  const blob = new Blob([JSON.stringify(goods)], {
    type: 'application/json',
  })

  goodsFormData.append('goods', blob)
  goodsFormData.append('thumbnail', thumbnail.value)
  goodsFormData.append('contentImage', contentImage.value)

  const isSuccess = await registerGoods(goodsFormData)
}

//굿즈 등록 시 검증
const validateGoods = () => {
  let isValid = true
  if (
    !goodsName.value ||
    !price.value ||
    !stock.value ||
    !material.value ||
    !size.value ||
    !thumbnail.value ||
    !designs.value.length
  ) {
    isValid = false
  }

  designs.value.forEach((design) => {
    if (!design) {
      isValid = false
    }
  })

  return isValid
}

//굿즈 상세 이미지 삭제 시 이벤트
const removeContentImage = () => {
  contentImage.value = null
}

//미리보기 - 미리보기 버튼 클릭 시 이벤트
const isPreviewOpen = ref(false)
const showPreview = () => {
  isPreviewOpen.value = true
}

//미리보기 닫기
const closePreview = () => {
  isPreviewOpen.value = false
}
</script>

<style lang="scss" scoped>
.tag {
  width: 100px;
}

.goods-quantity-input {
  width: 150px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background-color: #f2f2f2;
  text-indent: 12px;

  &::placeholder {
    font-size: 14px;
    color: #a2a2a2;
    text-indent: 12px;
  }
}

.goods-info-input {
  width: 450px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background-color: #f2f2f2;
  text-indent: 12px;

  &::placeholder {
    font-size: 14px;
    color: #a2a2a2;
    text-indent: 12px;
  }
}

.goods-design-input {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background-color: #f2f2f2;
  text-indent: 12px;

  &::placeholder {
    font-size: 14px;
    color: #a2a2a2;
    text-indent: 12px;
  }
}

.thumbnail-box {
  .thumbnail-label {
    width: 350px;
    height: 400px;
    background-color: white;
  }

  .thumbnail {
    width: 350px;
    height: 400px;
    padding: 10px;
    object-fit: contain;
    border: 3px solid #a2a2a2;
  }
}
</style>
