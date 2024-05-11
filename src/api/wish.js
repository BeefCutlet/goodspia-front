import { useToastStore } from '@/stores/toast'
import api from '.'

const toastStore = useToastStore()

export const getWishStatus = async (goodsId) => {
  return await api
    .get(`/wish/${goodsId}`)
    .then((response) => {
      return response.data
    })
    .catch(() => {
      toastStore.useToast('찜하기 정보 조회 실패')
    })
}

export const addWish = async (goodsId) => {
  return await api
    .post('/wish', { goodsId })
    .then(() => {
      return true
    })
    .catch(() => {
      toastStore.useToast('찜하기 등록 실패')
      return false
    })
}

export const deleteWish = async (goodsId) => {
  return await api
    .delete(`/wish/${goodsId}`)
    .then(() => {
      return true
    })
    .catch(() => {
      toastStore.useToast('찜하기 해제 실패')
      return false
    })
}
