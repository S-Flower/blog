<template>
  <div>
    <div class="msgBox">
      <div class="msgCon">
        <div class="msgContent">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-user" v-model="msgData.name">
          </el-input>
          <el-input placeholder="请输入内容" prefix-icon="el-icon-message" v-model="msgData.message">
          </el-input>
          <el-input placeholder="请输入内容" prefix-icon="el-icon-phone-outline" v-model="msgData.outline">
          </el-input>
          <!-- 输入框 -->
          <el-input type="textarea" placeholder="请输入内容" v-model="msgData.textarea" maxlength="30" show-word-limit style="margin:10px 0px">
          </el-input>
          <el-button type="success" size="small" style="margin:10px 0px" @click="submitMsg">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MsgAtr',
  data () {
    return {
      msgData: {
        name: '',
        message: '',
        outline: '',
        textarea: ''
      }
    }
  },
  methods: {
    // 提交留言
    async submitMsg () {
      this.msgData.author = this.$store.state.user._id
      const { data } = await axios.post('/api/msg', this.msgData)
      if (data.status === 202) return this.$message.warning(data.msg)
      this.$message.success(data.msg)
      this.msgData = {
        name: '',
        message: '',
        outline: '',
        textarea: ''
      }
    }
  }
}
</script>

<style>
.msgBox {
  width: 100%;
}
.msgContent {
  width: 80%;
  margin: 100px auto;
}
.msgContent input {
  margin: 10px 0px;
}
.el-button--small {
  width: 100%;
}
.el-textarea__inner {
  height: 180px;
}
</style>
