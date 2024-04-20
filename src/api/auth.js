import { useAuthStore } from '@/stores/auth'
import api from '.'

const authStore = useAuthStore()

//로그인
export const login = async (email, password) => {
  return await api
    .post('/auth/login', {
      email,
      password,
    })
    .then((response) => {
      console.log('data: ', response.data)
      console.log('accessToken: ', response.data.accessToken)
      authStore.setToken(response.data.accessToken)
    })
    .catch((err) => {
      console.log('로그인 실패, err: ', err.response.data)
      return '로그인 실패'
      //TODO: 알림 메시지 띄우기
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
      console.log('Login Success!')
      return true
    })
    .catch((err) => {
      console.log('회원가입 실패 err: ', err.response.data)
      return '회원가입 실패'
    })
}

//로그아웃
export const logout = async () => {
  return await api
    .post('/auth/logout')
    .then((response) => {
      authStore.deleteToken()
    })
    .catch((err) => {
      console.log('로그아웃 실패, err: ', err.response.data)
      return '로그아웃 실패'
    })
}

//액세스 토큰 재발급
export const retakeToken = async () => {
  return await api
    .post('/auth/refresh-token', {}, { retry: 0 })
    .then((response) => {
      console.log('액세스 토큰 재발급 성공')
      authStore.setToken(response.data.accessToken)
      return true
    })
    .catch((err) => {
      return false
    })
}
