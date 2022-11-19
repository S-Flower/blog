<template>
  <div>
    <div class="userBox">
      <h3>我的账号</h3>
      <div class="userData">
        <div class="userName">
          <span>昵称：{{ user.name }}</span>
        </div>
        <div class="userPermissions">
          <span v-if="user.make === 1">权限：普通用户</span>
          <span v-else>权限：普通用户</span>
        </div>
      </div>
      <div class="reviseBox">
        <el-button class="nickName" size="mini" type="warning" @click="handUser(1)">修改昵称</el-button>
        <el-button class="password" size="mini" type="warning" @click="handUser(0)">修改密码</el-button>
      </div>
    </div>
    <div class="box">
      <h3 style="margin-bottom:20px">我的收藏</h3>
      <div class="input">
        <MyInput @select="selectValue">
        </MyInput>
      </div>
      <!-- 表格 -->
      <div class="table">
        <MyTables :List="artShow" @edit="Operate" :label="artLabelList" :isView="isView = 1">
        </MyTables>
      </div>
    </div>
    <!-- 页码 -->
    <div class="Pagination">
      <MyPagination :Total="Total" @change="changeNum"></MyPagination>
    </div>
    <!-- 弹窗 -->
    <el-dialog :title="isReviseNick === 1 ? '修改昵称' : '修改密码'" :visible.sync="dialogVisible" width="30%"
      :close-on-click-modal="false">
      <span slot="footer" class="dialog-footer">
        <el-form ref="userDataFrom" :model="userDataFrom" label-width="80px" :label-position="labelPosition"
          :rules="rules">
          <el-form-item label="昵称" v-if="isReviseNick === 1" prop="name">
            <el-input v-model="userDataFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" v-else prop="password">
            <el-input v-model="userDataFrom.password"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitForm('userDataFrom')" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import MyInput from '../../components/MyInput.vue'
import MyTables from '../../components/MyTables.vue'
import MyPagination from '../../components/MyPaginas.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      artLabelList: [
        { prop: 'title', label: '标题' },
        { prop: 'label', label: '标签' },
        { prop: 'description', label: '描述' },
        { prop: 'date', label: '注册日期' },
        { prop: 'author.name', label: '作者' }
      ],
      currentPage: 1,
      currentStrip: 5,
      inputValue: '',
      Total: '',
      artShow: [],
      nickName: '',
      Password: '',
      dialogVisible: false,
      isReviseNick: 1,
      labelPosition: 'left',
      userDataFrom: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交文章发送请求函数
    async getData () {
      const { data } = await axios.get(`/api/userCollection?_id=${this.$store.state.user._id}`, {
        params: {
          Page: this.currentPage,
          Strip: this.currentStrip,
          inputValue: this.inputValue
        }
      })
      this.artShow = data.DataEd
      this.Total = data.Total
    },
    // 操作
    async Operate (isRevise, artData) {
      if (isRevise === 1) {
        window.open(location.origin + '/#' + '/home/content/' + artData._id)
      } else {
        // 删除
        const { data } = await axios.get('/api/collectionNo', {
          params: {
            artId: this.artId,
            userId: this.$store.state.user._id
          }
        })
        if (data.status === 202) return this.$message.warning(data.msg)
        this.$store.dispatch('a_userUpData')
        this.getData()
      }
    },
    changeNum (currentPage, currentStrip) {
      this.currentPage = currentPage
      this.currentStrip = currentStrip
      this.getData()
    },
    selectValue (value) {
      this.inputValue = value
      this.getData()
    },
    // 修改用户信息
    async handUser (a) {
      this.dialogVisible = true
      this.isReviseNick = a
    },
    submitForm (form) {
      this.$refs[form].validate(async (valid) => {
        if (!valid) return
        const reviseData = {
          _id: this.user._id,
          nickName: this.userDataFrom.name,
          password: this.userDataFrom.password
        }
        const { data } = await axios.post('/api/reviseUser', reviseData)
        console.log(data)
        this.$store.dispatch('a_userUpData')
        // 关闭弹窗
        this.dialogVisible = false
      })
      // 清空表单
      this.form = {
        name: '',
        user: '',
        password: ''
      }
    }
  },
  async created () {
    this.getData()
  },
  components: {
    MyInput,
    MyTables,
    MyPagination
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>
.el-upload-dragger {
  width: 220px;
  height: 180px;
}
</style>
<style>
.table {
  margin: 20px 0px;
}

.articleEditing {
  width: 100%;
  z-index: -100;
}

.articleEditingTop {
  position: relative;
  width: 100%;
  height: 170px;
  /* overflow: hidden; */
}

.EditingInput {
  width: 500px;
  overflow: hidden;
}

.EditingInput p {
  margin: 13px 0;
  font-size: 14px;
}

.EditingInput .label {
  display: block;
  margin: 0px;
}

.articleEditingTop .img {
  position: absolute;
  top: 0px;
  right: 30px;
  width: 220px;
  height: 150px;
}

.articleEditingTop .img img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.articleEditingTop .img:hover img {
  display: none;
}

.articleEditingBOttom {
  width: 100%;
  margin-top: 60px;
  z-index: -10 !important;
}

.editingButton {
  margin-top: 10px;
}

.editingRight {
  margin-left: 5px;
}
</style>
<!-- 头部 -->
<style>
.userBox {
  width: 100%;
}

.userData {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.userName {
  margin-left: 20px;
}

.userPermissions {
  margin-right: 20px;
  color: #888;
}

.reviseBox {
  margin: 20px 20px 20px 0px;
  display: flex;
  justify-content: end;
}

.reviseBox .nickName {
  margin-right: 8px;
  cursor: pointer;
}

.reviseBox .password {
  cursor: pointer;
}
</style>
