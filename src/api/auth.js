import { useToastStore } from '@/stores/toast'
import api from '.'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const toastStore = useToastStore()

//로그인
export const login = async (email, password) => {
  return await api
    .post('/auth/login', {
      email,
      password,
    })
    .then((response) => {
      authStore.setToken(response.data.accessToken)
      toastStore.useSuccessToast('로그인 성공')
      return true
    })
    .catch((error) => {
      toastStore.useSuccessToast('로그인 실패')
      return false
    })
}

//회원가입
export const signUp = async ({
  email,
  password,
  nickname,
  name,
  gender,
  phoneNumber,
  birthday,
  zipcode,
  address1,
  address2,
}) => {
  return await api
    .post('/members', {
      email,
      password,
      nickname,
      name,
      gender,
      phoneNumber,
      birthday,
      zipcode,
      address1,
      address2,
    })
    .then((response) => {
      authStore.setToken(response.data.accessToken)
      return true
    })
    .catch((err) => {
      return false
    })
}

//로그아웃
export const logout = async () => {
  return await api
    .post('/auth/logout')
    .then((response) => {
      authStore.deleteToken()
      toastStore.useSuccessToast('로그아웃 성공')
      return true
    })
    .catch((err) => {
      toastStore.useToast('로그아웃 실패')
      return false
    })
}

//액세스 토큰 재발급
export const retakeToken = async () => {
  return await api
    .post('/auth/refresh-token', {}, { retry: 0 })
    .then((response) => {
      authStore.setToken(response.data.accessToken)
      return true
    })
    .catch((err) => {
      return false
    })
}
