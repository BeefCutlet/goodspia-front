import { useToastStore } from '@/stores/toast'
import api from '.'

const toastStore = useToastStore()

//주문 목록 추가 여러개
export const completePayment = async (payment) => {
  return await api
    .post('/payment/complete', {
      paymentUid: payment.paymentUid,
      orderId: payment.orderId,
      amount: payment.amount,
    })
    .then((response) => {
      return true
    })
    .catch((error) => {
      toastStore.useToast('주문 목록 추가 실패')
      return false
    })
}
