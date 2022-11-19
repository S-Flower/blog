<template>
  <div>
    <el-container style="height: 90vh; border: 1px solid #eee">
      <el-aside width="200px" >
        <el-menu router :default-active="activeIndex">
            <template v-if="user.make==0">
              <el-menu-item index="/home/adminView/User"><span class="el-icon-timer"></span>用户管理</el-menu-item>
              <el-menu-item index="/home/adminView/text"><span class="el-icon-sunny"></span>文章管理</el-menu-item>
              <el-menu-item index="/home/adminView/msg"><span class="el-icon-notebook-2"></span>留言管理</el-menu-item>
              <el-menu-item index="/home/adminView/comments"><span class="el-icon-chat-dot-square"></span>评论管理</el-menu-item>
            </template>

            <template v-else>
              <el-menu-item index="/home/adminView/account"><span class="el-icon-notebook-2"></span>我的账号</el-menu-item>
          </template>

        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeIndex: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    setTimeout(() => {
      this.activeIndex = this.$route.path
    }, 500)
  }
}
</script>

<style scoped>
.el-aside {
  color: #333;
}
.el-menu {
  height: 100%;
}
</style>
