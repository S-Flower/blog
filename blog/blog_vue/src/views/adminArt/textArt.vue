<template>
  <div>
    <div class="box">
      <div class="input" v-if="isEditing==false">
        <MyInput  @select="selectValue">
          <template #addUser>
            <el-button type="success" size="small" @click="openEditing">添加文章</el-button>
          </template>
        </MyInput>
      </div>
      <!-- 文章编辑器 -->
      <div v-else class="articleEditing">
        <div class="articleEditingTop">
          <div class="EditingInput">
            <el-form :model="articleFrom" :rules="rules" ref="articleFrom">
              <el-form-item label="文章名称" prop="title">
                  <el-input style="width:300px" placeholder="请输入内容" size="mini" v-model="articleFrom.title"></el-input>
              </el-form-item>
              <el-form-item label="文章描述" prop="description">
                  <el-input style="width:300px" placeholder="请输入内容" size="mini" v-model="articleFrom.description"></el-input>
              </el-form-item>
              <el-form-item label="文章标签" prop="label">
                  <el-input style="width:300px" placeholder="请输入内容" size="mini" v-model="labelIng" @change="labelIngFun"></el-input>
              </el-form-item>
            </el-form>
              <span class="label" >
                <el-tag v-for="(item,index) in articleFrom.label" :key="(item,index)" closable @close="closeLabel(index)" type="warning" size="mini">
                  {{ item }}
                </el-tag>
              </span>
          </div>
          <div class="img" >
            <el-upload class="upload-demo" drag action="/api/upLocal" multiple :show-file-list="false" :on-success="successUpLocal"
              :on-error="errorUpLocal">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <img v-if="upLocalPathShow !==''" :src="upLocalPathShow" alt="">
            </el-upload>
          </div>
        </div>
        <!-- 富文本编辑器  -->
        <div class="articleEditingBOttom">
          <div id="main">
            <mavon-editor @change="editEd" ref='md' @imgAdd="imgAdd" v-model="oldEdit"/>
          </div>
        </div>
        <!-- 按钮 -->
        <div class="editingButton">
          <div class="editingLeft fl">
            <el-button type="warning" size="mini" @click="closeEditing">取消</el-button>
          </div>
          <div class="editingRight fl">
            <el-button type="success" size="mini" @click="submitArt('articleFrom')">确定</el-button>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <div class="table" v-show="isEditing==false">
        <MyTables :List="artShow" @edit="Operate" :label="artLabelList" :isView="isView=0">

        </MyTables>
      </div>
    </div>
    <!-- 页码 -->
    <div class="Pagination" v-show="isEditing==false">
      <MyPagination :Total="Total" @change="changeNum" v-model="articleFrom.EditingValue"></MyPagination>
    </div>
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
      artLabelList: [
        { prop: 'title', label: '标题' },
        { prop: 'label', label: '标签' },
        { prop: 'description', label: '描述' },
        { prop: 'date', label: '注册日期' },
        { prop: 'author.name', label: '作者' }
      ],
      port: 6611,
      isEditing: false,
      labelIng: '',
      upLocalPathShow: '',
      currentPage: 1,
      currentStrip: 5,
      Total: '',
      inputValue: '',
      oldEdit: '', // 富文本编辑器内容
      artShow: [],
      articleFrom: {
        title: '',
        label: [],
        description: '',
        upLocalPath: '', // 图片地址
        EditingValue: ''
      },
      // 表单规则
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入文章描述', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        label: [
          { type: 'array', required: true, message: '请输入文章标签' }
        ]
      }
    }
  },
  methods: {
    openEditing () {
      this.upLocalPathShow = ''
      this.isEditing = true
      this.oldEdit = ''
    },
    closeEditing () {
      this.isEditing = false
      this.articleFrom = {
        title: '',
        label: [],
        description: '',
        upLocalPath: '', // 图片地址
        EditingValue: ''
      }
      this.getData()
    },
    // 标签输入内容
    labelIngFun () {
      if (this.articleFrom.label.includes(this.labelIng)) this.$message.error('已存在，请重试')
      else this.articleFrom.label.push(this.labelIng)
      this.labelIng = ''
    },
    // 删除标签
    closeLabel (index) {
      this.articleFrom.label.splice(index, 1)
    },
    // 成功上传图片
    successUpLocal (response, file, fileList) {
      // this.upLocalPathShow = `http://localhost:${this.port}/${response.upLocalPath}`
      this.upLocalPathShow = `${this.$serve}/${response.upLocalPath}`
      this.articleFrom.upLocalPath = response.upLocalPath
      this.$message.success(response.msg)
    },
    // 失败上传图片
    errorUpLocal (err, file, fileList) {
      this.$message.warning(err.msg)
    },
    // 编辑器
    editEd (value, render) {
      this.articleFrom.EditingValue = value
    },
    // 富文本图片上传
    imgAdd (pos, $file) {
      const forData = new FormData()
      forData.append('file', $file)
      this.$http({
        url: '/api/upLocal',
        method: 'post',
        data: forData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((url) => {
        // this.$refs.md.$img2Url(pos, `http://localhost:${this.port}/${url.data.upLocalPath}`)
        this.$refs.md.$img2Url(pos, `${this.$serve}/${url.data.upLocalPath}`)
      })
    },
    // 提交文章发送请求函数
    submitArt (articleFrom) {
      this.$refs[articleFrom].validate(async (valid) => {
        if (!valid) return this.$message.warning('请输入内容')
        if (valid) {
          if (this.articleFrom.upLocalPath === '') return this.$message.warning('请添加图片')
          if (this.articleFrom.EditingValue === '') return this.$message.warning('请输入文章内容')
          const reg = new RegExp(this.$serve + '/', 'g')
          this.articleFrom.EditingValue = this.articleFrom.EditingValue.replace(reg, '')
          // this.articleFrom.EditingValue = this.articleFrom.EditingValue.replace(/http:\/\/localhost:6611\//g, '')
          // 添加用户信息
          this.articleFrom.author = this.$store.state.user._id
          const { data } = await axios.post('/api/Art', this.articleFrom)
          if (data.status === 202) return this.$message.warning(data.msg)
          this.$message.success(data.msg)
          this.articleFrom = {
            title: '',
            label: [],
            description: '',
            upLocalPath: '', // 图片地址
            EditingValue: ''
          }
          this.upLocalPathShow = ''
          this.oldEdit = ''
        }
      })
    },
    async getData () {
      const { data } = await axios.get(`/api/artData?currentPage=${this.currentPage}&currentStrip=${this.currentStrip}&inputValue=${this.inputValue}`)
      this.artShow = data.artData
      this.Total = data.Total
    },
    // 操作
    async Operate (isRevise, artData) {
      if (isRevise === 1) {
        // 修改
        this.isEditing = true
        this.articleFrom = artData
        // this.oldEdit = artData.EditingValue.replace(/\\upLocal/g, `http://localhost:${this.port}\\/upLocal`)
        this.oldEdit = artData.EditingValue.replace(/\\upLocal/g, `${this.$serve}\\/upLocal`)
        this.upLocalPathShow = `http://localhost:${this.port}/${artData.upLocalPath}`
      } else {
        // 删除
        const { data } = await axios.delete(`/api/deleteArt?_id=${artData._id}`)
        if (data.status === 202) return this.$message.warning(data.msg)
        this.$message.success(data.msg)
        this.getData()
      }
    },
    changeNum (currentPage, currentStrip) {
      this.currentPage = currentPage
      this.currentStrip = currentStrip
      this.getData()
    },
    async selectValue (value) {
      this.inputValue = value
      this.getData()
    }
  },
  async created () {
    this.getData(1, 5)
  },
  components: {
    MyInput,
    MyTables,
    MyPagination
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
.articleEditingTop .img:hover img{
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
