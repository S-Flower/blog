<template>
  <div>
    <div class="box">
      <div class="table">
        <MyTables :List="commentShow" @edit="Operate" :label="commentLabelList" :isView="isView = 1">
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
      commentLabelList: [
        { prop: 'date', label: '日期' },
        { prop: 'userId.name', label: '发布人' },
        { prop: 'artId.title', label: '所属文章' },
        { prop: 'content', label: '评论内容' }
      ],
      commentShow: [],
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
      const { data } = await axios.get(`/api/commentPage/?currentPage=${this.currentPage}&currentStrip=${this.currentStrip}`)
      console.log(data)
      if (data.status === 202) return this.$message.warning(data.msg)
      this.commentShow = data.commentData
      this.Total = data.Total
    },
    // 操作函数
    async Operate (isRevise, CommentData) {
      if (isRevise === 1) {
        this.$confirm(CommentData.content, '留言内容', { showCancelButton: false })
        // 查看评论
      } else {
        const { data } = await axios.delete(`/api/deleteComment?_id=${CommentData._id}`)
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
