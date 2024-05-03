import { useToastStore } from '@/stores/toast'
import api from '.'

const toastStore = useToastStore()

//굿즈 목록 조회
export const getGoodsList = async () => {
  return await api
    .get('/goods/list?page=0&size=6')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toastStore.useToast('굿즈 목록 조회 실패')
    })
}

//아티스트가 등록한 굿즈 목록 조회
export const getRegisteredGoodsList = async () => {
  return await api
    .get('/goods/artist')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log('등록한 굿즈 목록 조회 실패, error: ', error.response.data)
    })
}

//아티스트가 등록한 굿즈 단건 조회
export const getRegisteredGoods = async (goodsId) => {
  return await api
    .get(`/goods/artist/${goodsId}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toastStore.useToast('등록한 굿즈 상세 정보 조회 실패')
    })
}

//굿즈 단건 조회
export const getGoods = async (goodsId) => {
  return await api
    .get(`/goods/${goodsId}`)
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      toastStore.useToast('굿즈 정보 조회 실패')
    })
}

//굿즈 등록
export const registerGoods = async (goods) => {
  return await api
    .post('/goods', goods, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      toastStore.useSuccessToast('굿즈 등록 성공')
      return true
    })
    .catch((error) => {
      toastStore.useToast('굿즈 등록 실패')
      return false
    })
}

//굿즈 정보 수정
export const modifyGoods = async (goods) => {
  return await api
    .put('/goods', goods, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      toastStore.useSuccessToast('굿즈 수정 성공')
      return true
    })
    .catch((error) => {
      toastStore.useToast('굿즈 등록 실패')
      return false
    })
}
