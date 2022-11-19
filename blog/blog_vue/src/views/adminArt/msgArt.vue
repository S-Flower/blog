<template>
  <div>
    <div class="box">
        <div class="table">
          <MyTables :List="msgShow" @edit="Operate" :label="msgLabelList" :isView="isView=1">
          </MyTables>
        <div class="Pagination">
          <MyPagination @change="changeNum" :Total="Total"></MyPagination>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MyTables from '../../components/MyTables.vue'
import MyPagination from '../../components/MyPaginas.vue'
export default {
  data () {
    return {
      msgLabelList: [
        { prop: 'author.name', label: '作者' },
        { prop: 'name', label: '名字' },
        { prop: 'message', label: '邮箱' },
        { prop: 'outline', label: '电话' },
        { prop: 'textarea', label: '内容' }
      ],
      msgShow: [],
      currentPage: 1,
      currentStrip: 5,
      Total: ''
    }
  },
  components: {
    MyTables,
    MyPagination
  },
  methods: {
    // 请求后端留言数据
    async getData () {
      const { data } = await axios.get(`/api/msgData/?currentPage=${this.currentPage}&currentStrip=${this.currentStrip}`)
      if (data.status === 202) return this.$message.warning(data.msg)
      this.msgShow = data.msgData
      this.Total = data.Total
    },
    // 操作函数
    async Operate (isRevise, msgData) {
      if (isRevise === 1) {
        this.$confirm(msgData.textarea, '留言内容', { showCancelButton: false })
      } else {
        const { data } = await axios.delete(`/api/deleteMsg?_id=${msgData._id}`)
        if (data.status === 202) return this.$message.warning(data.msg)
        this.$message.success(data.msg)
        this.getData()
      }
    },
    // 分页
    changeNum (currentPage, currentStrip) {
      this.currentPage = currentPage
      this.currentStrip = currentStrip
      this.getData()
    }
  },
  async created () {
    this.getData(1, 5)
  }
}
</script>

<style>
.Pagination {
  margin-top: 20px;
}
</style>
