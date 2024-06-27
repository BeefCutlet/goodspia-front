import api from '.'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()

/**
 * 쿠폰 수령
 */
export const receiveCoupon = async (couponId) => {
  return await api
    .post('/coupons/member', {
      couponId,
    })
    .then(() => {
      toastStore.useSuccessToast('쿠폰을 정상적으로 수령하였습니다.')
      return true
    })
    .catch(() => {
      toastStore.useToast('쿠폰 수령에 실패하였습니다.')
      return false
    })
}

/**
 * 받은 쿠폰 목록 조회
 */
export const getCouponList = async () => {
  return await api
    .get('/coupons')
    .then((response) => {
      return response.data
    })
    .catch(() => {
      toastStore.useToast('받은 쿠폰 목록 조회 실패')
      Promise.reject()
    })
}

/**
 * 등록된 쿠폰 목록 조회
 */
export const getGoodsCouponList = async (goodsId) => {
  return await api
    .get(`/coupons/goods/${goodsId}`)
    .then((response) => {
      return response.data
    })
    .catch(() => {
      toastStore.useToast('쿠폰 목록 조회 실패')
      Promise.reject()
    })
}
