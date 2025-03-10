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
      try {
        const response = await api.login(credentials)
        console.log('登录响应:', response.data)
        
        // 根据您的后端API响应格式调整这里
        // 假设响应格式为 { token: 'xxx', user: { username: 'xxx', ... } }
        const token = response.data.token || response.data.accessToken
        const username = response.data.user?.username || response.data.username
        
        if (!token) {
          throw new Error('响应中没有找到token')
        }
        
        commit('setAuth', { token, username })
        return response
      } catch (error) {
        console.error('登录action错误:', error)
        throw error
      }
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