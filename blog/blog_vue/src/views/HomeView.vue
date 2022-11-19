<template>
  <div class="home">
    <!-- 首页导航栏 -->
    <div class="head" :key="a">
      <div class="center">
        <!-- logo盒子 -->
        <div class="logoText">
          <h1>Ikun</h1>
        </div>
        <!-- 导航栏 -->
        <div class="headNav">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
            <el-menu-item index="/home/new"><span class="el-icon-timer"></span>最新</el-menu-item>
            <el-menu-item index="/home/hot"><span class="el-icon-sunny"></span>热门</el-menu-item>
            <el-menu-item index="/home/all"><span class="el-icon-notebook-2"></span>总览</el-menu-item>
            <el-menu-item index="/home/msg"><span class="el-icon-chat-dot-square"></span>留言</el-menu-item>
            <el-menu-item index="/home/about"><span class="el-icon-view"></span>关于</el-menu-item>
            <el-menu-item index="/home/admin"><span class="el-icon-s-tools"></span>后台</el-menu-item>
          </el-menu>
        </div>
        <!-- 登录搜索栏 -->
        <div class="seek">
          <div class="input fl">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model.lazy="inputValue" size="mini">
            </el-input>
          </div>
          <div class="button fr">
            <template v-if="$store.state.token">
              <div class="left fl logout">
                <el-button type="warning" size="mini" @click="Logout">退出</el-button>
              </div>
              <div class="textUser">
                <span>{{$store.state.user.name}}</span>
              </div>
            </template>
            <template v-else>
              <div class="left fl">
                <el-button type="primary" size="mini" @click="openLogin">登录</el-button>
              </div>
              <div class="right fl">
                <el-button type="success" size="mini" @click="openRegister">注册</el-button>
              </div>
            </template>
          </div>
        </div>
        <!-- 主体侧边栏 -->
        <div class="Sidebar fr" v-if="!$route.path.includes('admin')">
          <div class="logoImg">
            <img src="../assets/1.png" alt="">
            <p>鸡你太美</p>
          </div>
          <div class="middle">
            <h5>文章标签</h5>
            <div class="label">
              <el-tag v-for="(item,index) in tagsArr" :key="index"  type="warning" @click="tagJump(item)">{{ item }}</el-tag>
          </div>
          </div>
          <div class="text">
            <h5>毒鸡汤</h5>
            <p v-if="text">{{text}}</p>
            <div class="await" v-else>
              <span class="el-icon-loading"></span>
              <p>玩命加载中</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 主体盒子 -->
    <div class="Principal">
      <!-- 内容盒子 -->
      <div class="content" v-if="!$route.path.includes('admin')">
        <!-- <p>1111</p> -->
        <router-view></router-view>
      </div>
      <div class="admin" v-else>
        <router-view></router-view>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog :title="isLogin===1?'登录':'注册'" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <span slot="footer" class="dialog-footer">
        <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition" :rules="rules">
          <el-form-item label="昵称" v-if="isLogin===2" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="user">
            <el-input v-model="form.user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input  type="password" v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')"  size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 回到顶部 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import axios from 'axios'
// 映射
import { mapMutations } from 'vuex'
export default {
  name: 'HomeView',
  data () {
    return {
      activeIndex: '',
      inputValue: '',
      tagsArr: [],
      text: '',
      form: {
        name: '',
        user: '',
        password: ''
      },
      dialogVisible: false,
      isLogin: 0, // 2是注册 1是登录,
      labelPosition: 'left',
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      a: 1
    }
  },
  methods: {
    ...mapMutations(['GetMarker', 'OutFun', 'selectValue']),
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    },
    openRegister () {
      this.dialogVisible = true
      this.isLogin = 2
    },
    openLogin () {
      this.dialogVisible = true
      this.isLogin = 1
    },
    Logout () {
      this.OutFun()
      location.reload()
    },
    submitForm (form) {
      this.$refs[form].validate(async (valid) => {
        if (!valid) return
        // 如果isLogin是1发送登录请求，2 发送注册请求
        if (this.isLogin === 1) {
          // 访问所带的参数
          const UserData = {
            user: this.form.user,
            password: this.form.password
          }
          const { data } = await axios.post('/api/login', UserData)
          if (data.status !== 200) return this.$message.error(data.msg)
          this.$message.success(data.msg)
          // 将token和用户数据存放在vuex中
          this.GetMarker(data)
        } else {
          const { data } = await axios.post('/api/user', this.form)
          if (data.status !== 200) return this.$message.error(data.msg)
          this.$message.success(data.msg)
        }
        this.dialogVisible = false
      })
      // 清空表单
      this.form = {
        name: '',
        user: '',
        password: ''
      }
    },
    // 标签
    tagJump (value) {
      if (this.$route.path === `/home/tagArt/${value}`) return
      this.$router.push(`/home/tagArt/${value}`)
      this.activeIndex = ''
    }
  },
  async created () {
    const a = await this.$http.get('/api/text')
    a.status === 200 ? this.text = a.data.data : this.text = '请求失败'
    // 获取当前导航栏的路由路径
    this.$route.path.includes('adminView') ? this.activeIndex = '/home/admin' : this.activeIndex = this.$route.path
    // 请求文章标签
    const { data } = await axios.get('/api/tags/')
    data.tagsArrEd.splice(0, 6)
    this.tagsArr = data.tagsArrEd
  },
  components: {
  },
  // 监听搜索框的值
  watch: {
    inputValue (value) {
      this.selectValue(value)
      if ((this.$route.path.includes('/home/new'))) return ''
      this.a++
      this.$router.push('/home/new')
      this.activeIndex = '/home/new'
    }
  }
}
</script>

<style>
.head {
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 60px;
  background-color: rgb(84, 92, 100);
  z-index: 2000;
}
.center {
  position: relative;
  max-width: 1300px;
  min-width: 1100px;
  height: 100%;
  background-color: aqua;
  margin: auto;
}
.logoText {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100px;
  height: 100%;
  background-color: rgb(84, 92, 100);
}
.logoText h1 {
  font-size: 22px;
  line-height: 60px;
  text-align: center;
  color: #ffd04b;
  font-family: normal;
}
.headNav {
  margin: 0px 380px 0px 100px;
  /* min-width: 582px; */
}
.seek {
  padding: 15px 0px;
  position: absolute;
  top: 0px;
  right:0px;
  width: 380px;
  height: 100%;
  background-color: rgb(84, 92, 100);
  box-sizing: border-box;
}
.seek .input {
  width: 200px;
}
.seek .button {
  position: relative;
  width: 170px;
}
.seek .button .left {
  margin: 0px 5px 0px 0px;
}
.textUser {
  width: 100px;
  white-space: initial;
  color:#ddd;
  position: absolute;
  top: 50%;
  left:1000px;
  transform: translate(0px,-50%);
  opacity: 0;
  animation: textMove 1s forwards;
}
@keyframes textMove {
  100%{
  left: 70px;
  opacity: 1;
  }
}
.Sidebar {
  margin-top: 20px;
  width: 400px;
}
/* 主体内容样式 */
.Principal {
  width: 1300px;
  height: 500px;
  margin: auto;
}
.content {
  margin-top: 60px;
  width: 640px;
  /* height: 400px; */
  margin-left: 100px;
}
.Sidebar .logoImg {
  width: 200px;
  text-align: center;
  margin: auto;
}
.Sidebar p {
  margin-top: 10px;
}
.logoImg img {
  width: 120px;
  animation: imgMove 2s linear infinite;
}
@keyframes imgMove {
  50% {
    transform: scale(1.2);
  }
}
.Sidebar h5 {
  color: #666;
  font-size: 14px;
  text-align: center;
  margin: 5px 0px;
}
.middle {
  width: 100%;
  height: 165px;
  border-top: 1px solid #ddd ;
  border-bottom: 1px solid #ddd;
}
.label {
  width: 340px;
  margin: auto;
}
.el-tag {
  margin:5px 5px;
}
.text p {
  text-align: center;
  color: #666;
  font-size: 16px;
  padding: 20px 20px;
}
.await {
  text-align: center;
  margin: auto;
  margin-top: 10px;
  width: 100%;
  height: 100%;
  font-size: 35px;
}
.text .await p {
  font-size: 14px;
  padding: 0px 0px;
  color:rgb(65, 136, 190);
}
.el-dialog__body {
  padding: 0px !important
}
.el-dialog__header {
  text-align: center;
}
.admin {
  width: 100%;
  height: 100%;
  margin-top: 61px;
}
.el-tag {
  cursor: pointer;
}
</style>
