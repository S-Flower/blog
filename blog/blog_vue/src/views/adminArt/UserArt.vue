<template>
  <div>
   <div class="box">
    <div class="input">
      <MyInput @select="selectValue">
        <template #addUser >
          <el-button type="success" size="small" @click="openDrawer">添加用户</el-button>
        </template>
      </MyInput>
    </div>
    <div class="table">
      <MyTables :List="userList" @edit="userOperate" :label="userLabelList" :isView="isView=0">
      </MyTables>
    </div>
    <div class="Pagination">
      <MyPagination :Total="Total" @change="changeNum"></MyPagination>
    </div>
   </div>
      <el-drawer :title="drawer.type==0?'添加用户':'修改用户'" :visible.sync="drawer.flag" >
        <div class="drawerBox">
          <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition" :rules="rules">
            <el-form-item label="昵称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="user">
              <el-input v-model="form.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="用户类型" prop="make">
              <el-select v-model="form.make" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button v-if="drawer.type == 0" type="success" size="small" @click="addUser('form')">添加用户</el-button>
          <el-button v-else type="success" size="small" @click="addUser('form')">修改用户</el-button>
        </div>
      </el-drawer>
  </div>
</template>

<script>
import axios from 'axios'
import MyInput from '../../components/MyInput.vue'
import MyTables from '../../components/MyTables.vue'
import MyPagination from '../../components/MyPaginas.vue'
export default {
  data () {
    return {
      userList: [],
      userLabelList: [
        { prop: 'name', label: '昵称' },
        { prop: 'user', label: '用户名' },
        { prop: 'make', label: '用户权限' },
        { prop: 'date', label: '注册日期' }
      ],
      Total: '',
      currentPage: 1,
      currentStrip: 5,
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
        ],
        make: [
          { required: true, message: '必须选择', trigger: 'blur' }
        ]
      },
      drawer: {
        flag: false,
        type: 0 // 0是增加 1是修改
      },
      form: {
        name: '',
        user: '',
        password: '',
        make: ''
      },
      options: [{
        value: 0,
        label: '管理员'
      }, {
        value: 1,
        label: '普通用户'
      }],
      inputValue: ''
    }
  },
  components: {
    MyInput,
    MyTables,
    MyPagination
  },
  methods: {
    async getData () {
      const { data } = await axios.get(`/api/UserShow?currentPage=${this.currentPage}&currentStrip=${this.currentStrip}&inputValue=${this.inputValue}`)
      this.userList = data.UserData
      this.Total = data.Total
    },
    openDrawer () {
      this.drawer = {
        flag: true,
        type: 0 // 0是增加 1是修改
      }
      this.form = {
        name: '',
        user: '',
        password: ''
      }
    },
    changeNum (currentPage, currentStrip) {
      this.currentPage = currentPage
      this.currentStrip = currentStrip
      this.getData()
    },
    addUser (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        if (this.drawer.type === 0) {
          const { data } = await axios.post('/api/user', this.form)
          data.status === 202 ? this.$message.error(data.msg) : this.$message.success(data.msg)
          this.getData()
        } else {
          const { data } = await axios.post('/api/userUp', this.form)
          if (data.status === 202) return this.$message.error(data.msg)
          this.getData()
        }
        this.form = {
          name: '',
          user: '',
          password: ''
        }
        this.drawer.flag = false
      })
      // 清空表单
    },
    async userOperate (make, UserData) {
      const _id = UserData._id
      if (make === 1) {
        this.drawer = {
          flag: true,
          type: 1
        }
        this.form = {
          name: UserData.name,
          user: UserData.user,
          password: UserData.password,
          make: UserData.make,
          _id: UserData._id
        }
      } else {
        const { data } = await axios.delete(`/api/userDelete?_id=${_id}`)
        if (!data.status === 200) return this.$message.warning(data.msg)
        this.$message.success(data.msg)
        this.getData()
      }
    },
    async selectValue (value) {
      this.inputValue = value
      this.getData()
    }
  },
  async created () {
    this.getData(1, 5)
  }
}
</script>

<style scoped>
.table {
  margin: 20px 0px;
}
.drawerBox {
  text-align: center;
  width: 90%;
  margin: 20px 20px;
}
</style>
