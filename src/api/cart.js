import api from '.'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()

//장바구니 목록 조회
export const getCartList = async () => {
  return await api
    .get('/cart/list')
    .then((response) => {
      return response.data
    })
    .catch((error) => {})
}

//장바구니 등록
export const addCartList = async (cartList) => {
  return await api
    .post('/cart', cartList)
    .then((response) => {
      toastStore.useSuccessToast('장바구니 등록 성공')
      return true
    })
    .catch((error) => {
      toastStore.useToast('장바구니 등록 실패')
      return false
    })
}

//장바구니 수량 변경
export const changeCartGoodsQuantity = async (cartId, quantity) => {
  return await api
    .put('/cart/quantity', {
      cartId,
      quantity,
    })
    .then((response) => {
      return true
    })
    .catch((error) => {
      toastStore.useToast('장바구니 수량 변경 실패')
      return false
    })
}

//장바구니 삭제
export const deleteCart = async (cartId) => {
  return await api
    .delete(`/cart/${cartId}`)
    .then((response) => {
      return true
    })
    .catch((error) => {
      return false
    })
}
