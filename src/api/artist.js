import { useToastStore } from '@/stores/toast'
import api from '.'
const toastStore = useToastStore()

export const applyForArtist = async (artist) => {
  return await api
    .post('/artists', artist)
    .then((response) => {
      toastStore.useSuccessToast('아티스트 등록 성공')
      return true
    })
    .catch((error) => {
      toastStore.useToast('아티스트 등록 실패')
      return false
    })
}

export const getArtist = async () => {
  return await api
    .get('/artists')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toastStore.useToast('아티스트 정보 조회 실패')
    })
}

export const updateArtist = async (artist) => {
  return await api
    .put('/artists/', artist, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      toastStore.useSuccessToast('아티스트 정보 수정 성공')
      return true
    })
    .catch((error) => {
      toastStore.useToast('아티스트 정보 수정 실패')
      return false
    })
}
