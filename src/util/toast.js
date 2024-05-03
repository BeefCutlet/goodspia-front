import { toast } from 'vue3-toastify'

export const useToast = (message, type) => {
  toast(message, {
    type,
  })
}
