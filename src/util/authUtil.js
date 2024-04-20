import { retakeToken } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
export const validateAuth = async () => {
  if (!authStore.isTokenExist) {
    const isSuccess = await retakeToken()
    return isSuccess
  }
  return true
}
