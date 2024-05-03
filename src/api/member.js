import { useToastStore } from '@/stores/toast'
import api from '.'
const toastStore = useToastStore()

export const getMember = async () => {
  return await api
    .get('/members/info')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      useToastStore.useToast('회원 정보 조회 실패')
      return null
    })
}

export const updateMember = async ({
  name,
  nickname,
  phoneNumber,
  birthday,
}) => {
  return await api
    .put('/members', {
      name,
      nickname,
      phoneNumber,
      birthday,
    })
    .then((response) => {
      toastStore.useSuccessToast('회원 정보 수정 성공')
      return true
    })
    .catch((error) => {
      toastStore.useToast('회원 정보 수정 실패')
      return false
    })
}
