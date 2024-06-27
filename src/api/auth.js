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
export const signUp = async (member) => {
  return await api
    .post('/members', {
      email: member.email,
      password: member.password,
      nickname: member.nickname,
      name: member.name,
      gender: member.gender,
      phoneNumber: member.phoneNumber,
      birthday: member.birthday,
      zipcode: member.zipcode,
      address1: member.address1,
      address2: member.address2,
    })
    .then((response) => {
      authStore.setToken(response.data.accessToken)
      return true
    })
    .catch((err) => {
      toastStore.useToast('회원가입 실패')
      Promise.reject()
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
