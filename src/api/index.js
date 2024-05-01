import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import { retakeToken } from './auth'

const authStore = useAuthStore()

//axios 인스턴스
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  retry: 1,
  timeout: 3000,
})

//요청 인터셉터 - Authorization 헤더에 AccessToken 추가
api.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = authStore.bearerToken
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

//응답 인터셉터
//인증 실패 시 리프레시 토큰으로 액세스 토큰 재발급 후 재시도 - 실패 시 로그인 페이지로 이동
api.interceptors.response.use(
  (response) => {
    console.log('Response Data: ', response.data)
    return response
  },
  async (error) => {
    const { config, message } = error
    if (!config || !config.retry || config.retry === 0) {
      return Promise.reject(error)
    }

    // 네트워크 시간 초과, 네트워크 에러 시 reject
    if (message.includes('timeout') || message.includes('Network Error')) {
      return Promise.reject(error)
    }

    config.retry -= 1

    if (error.response.status == 403) {
      //인증 실패일 경우, 액세스 토큰 재발급
      //=> 성공 시, 이전 요청 재시도
      //=> 실패 시, 로그인 화면으로 이동
      const isSuccess = await retakeToken()
      if (isSuccess) {
        axios.request(error.request.config)
      } else {
        location.replace('/auth/sign-in')
        return
      }
    }
    return Promise.reject(error)
  },
)

export default api
