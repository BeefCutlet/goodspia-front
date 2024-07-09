import { useToastStore } from '@/stores/toast'
import api from '.'

const toastStore = useToastStore()

//주문 목록 추가 여러개
export const addOrders = async (orders) => {
  return await api
    .post('/orders', {
      orders,
    })
    .then((response) => {
      return response.data
    })
    .catch(() => {
      toastStore.useToast('주문 정보 저장 실패')
      return null
    })
}

//주문 목록 제거
export const deleteOrder = async (orderId) => {
  return await api
    .delete(`/orders/${orderId}`)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

//요청받은 주문 목록 조회
export const getRequestedOrderList = async () => {
  return await api
    .get('/orders/artist')
    .then((response) => {
      return response.data
    })
    .catch(() => {
      toastStore.useToast('주문 목록 조회 실패')
      return Promise.reject()
    })
}
