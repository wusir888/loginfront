<template>
  <div class="home">
    <div class="card">
      <h1>欢迎使用用户管理系统</h1>
      <p>这是一个基于Spring Boot和Vue.js的用户管理系统。</p>
      <div v-if="!isLoggedIn" class="action-buttons">
        <el-button type="primary" @click="$router.push('/login')">登录</el-button>
        <el-button @click="$router.push('/register')">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const isLoggedIn = computed(() => store.getters.isLoggedIn)

    return {
      isLoggedIn
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 40px 0;
}

h1 {
  margin-bottom: 20px;
}

.action-buttons {
  margin-top: 30px;
}

.action-buttons .el-button {
  margin: 0 10px;
}
</style> 