import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('pay', {
  state: () => ({
    payMethod: 'CARD',
  }),
  actions: {
    setPayMethod(method) {
      this.payMethod = method
    },
  },
})
