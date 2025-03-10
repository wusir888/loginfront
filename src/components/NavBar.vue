<template>
  <el-menu
    :default-active="activeIndex"
    class="navbar"
    mode="horizontal"
    router
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/">首页</el-menu-item>
    <div class="flex-grow"></div>
    <template v-if="!isLoggedIn">
      <el-menu-item index="/login">登录</el-menu-item>
      <el-menu-item index="/register">注册</el-menu-item>
    </template>
    <template v-else>
      <el-menu-item index="/profile">个人中心</el-menu-item>
      <el-menu-item @click="logout">退出登录</el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'NavBar',
  setup() {
    const store = useStore()
    const router = useRouter()
    const activeIndex = ref('/')

    const isLoggedIn = computed(() => store.getters.isLoggedIn)

    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }

    return {
      activeIndex,
      isLoggedIn,
      logout
    }
  }
}
</script>

<style scoped>
.navbar {
  padding: 0 20px;
}

.flex-grow {
  flex-grow: 1;
}
</style> 