import axios from 'axios'
import store from '@/store'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // 启用跨域凭证
})

// 请求拦截器添加token
api.interceptors.request.use(
  config => {
    const token = store.getters.getToken
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器处理错误
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      store.commit('clearAuth')
    }
    return Promise.reject(error)
  }
)

export default {
  // 认证相关
  login(credentials) {
    return api.post('/auth/login', credentials)
  },
  register(userData) {
    return api.post('/auth/register', userData)
  },
  logout() {
    return api.post('/auth/logout')
  },
  
  // 用户相关
  getCurrentUser() {
    return api.get('/auth/me')
  },
  getUserById(id) {
    return api.get(`/users/${id}`)
  }
} 