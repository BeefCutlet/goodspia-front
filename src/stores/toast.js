import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [],
  }),
  actions: {
    useToast(message, type = toast.TYPE.ERROR) {
      toast(message, {
        type,
      })
      // this.toasts.push({ message, type })
    },
    useSuccessToast(message) {
      toast.success(message)
      // this.useToast(message, toast.TYPE.SUCCESS)
    },
  },
})
