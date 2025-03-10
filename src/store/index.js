import { createStore } from 'vuex'
import api from '@/services/api'

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null
  },
  getters: {
    isLoggedIn: state => !!state.token,
    getToken: state => state.token,
    getUsername: state => state.username
  },
  mutations: {
    setAuth(state, { token, username }) {
      state.token = token
      state.username = username
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
    },
    clearAuth(state) {
      state.token = null
      state.username = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await api.login(credentials)
      const { token, username } = response.data
      commit('setAuth', { token, username })
      return response
    },
    async register(_, userData) {
      return await api.register(userData)
    },
    async logout({ commit }) {
      try {
        await api.logout()
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        commit('clearAuth')
      }
    }
  }
}) 