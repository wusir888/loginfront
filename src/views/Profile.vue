<template>
  <div class="profile">
    <div class="card">
      <h2>个人中心</h2>
      <div v-if="loading" class="loading">
        <el-skeleton :rows="5" animated />
      </div>
      <div v-else-if="user">
        <UserInfo :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import UserInfo from '@/components/UserInfo.vue'
import api from '@/services/api'

export default {
  name: 'Profile',
  components: {
    UserInfo
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = ref(null)
    const loading = ref(true)

    onMounted(async () => {
      if (!store.getters.isLoggedIn) {
        router.push('/login')
        return
      }

      try {
        const response = await api.getCurrentUser()
        user.value = response.data
      } catch (error) {
        console.error('Failed to fetch user data:', error)
        if (error.response?.status === 401) {
          store.dispatch('logout')
          router.push('/login')
        }
      } finally {
        loading.value = false
      }
    })

    return {
      user,
      loading
    }
  }
}
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: 0 auto;
}

.loading {
  padding: 20px;
}
</style> 