<template>
  <div class="user-info">
    <el-descriptions title="用户信息" :column="1" border>
      <el-descriptions-item label="用户名">{{ user.username }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ user.email }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{ user.phone || '未设置' }}</el-descriptions-item>
      <el-descriptions-item label="账户状态">
        <el-tag :type="statusType">{{ statusText }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
        {{ formatDate(user.createdAt) }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'UserInfo',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const statusType = computed(() => {
      switch (props.user.status) {
        case 'ACTIVE':
          return 'success'
        case 'LOCKED':
          return 'danger'
        case 'DISABLED':
          return 'info'
        default:
          return 'warning'
      }
    })

    const statusText = computed(() => {
      switch (props.user.status) {
        case 'ACTIVE':
          return '正常'
        case 'LOCKED':
          return '锁定'
        case 'DISABLED':
          return '禁用'
        default:
          return '未知'
      }
    })

    const formatDate = (dateString) => {
      if (!dateString) return '未知'
      const date = new Date(dateString)
      return date.toLocaleString()
    }

    return {
      statusType,
      statusText,
      formatDate
    }
  }
}
</script>

<style scoped>
.user-info {
  margin-top: 20px;
}
</style> 