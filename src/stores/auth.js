import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
  }),
  getters: {
    bearerToken: (state) => 'Bearer ' + state.token,
    isTokenExist: (state) => {
      return state.token === null || state.token === '' ? false : true
    },
  },
  actions: {
    setToken(accessToken) {
      this.token = accessToken
    },
    deleteToken() {
      this.token = ''
    },
  },
})
