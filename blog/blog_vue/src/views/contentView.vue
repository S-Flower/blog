<template>
  <div>
    <div class="contentArt" v-if="artData.author">
      <h2>{{ artData.title }}</h2>
      <div class="userData">
        <div class="userLeft">
          <div class="avatar">
            <img src="../assets/1.png" alt="">
          </div>
          <div class="userDataS">
            <div class="userName" >{{ artData.author.name }}</div>
            <span>时间{{ $dayjs(artData.date).format('YYYY-MM-DD HH:mm') }}</span>
            <span>浏览{{ artData.lookCont }}</span>
            <span>评论{{ commentTotal }}</span>
            <span>喜欢{{ artData.like }}</span>
          </div>
        </div>
        <!-- 标签 -->
        <div class="userRight">
          <div class="tag" v-for="(item, index) in artData.label" :key="index">
            <el-tag size="small" type="warning">{{ item }}</el-tag>
          </div>
        </div>
      </div>
      <!-- 富文本 -->
      <div class="description">
        <mavon-editor v-model="textValue" defaultOpen="preview" :toolbarsFlag='false' :subfield='false' codeStyle='stackoverflow-dark'/>
      </div>
      <div class="collection" @click="collection" v-if="!user.CollectionList.includes(this.artId)">收藏</div>
      <div class="collection" @click="collectionNo" v-else>已收藏</div>
      <hr>
      <!-- 评论 -->
      <div class="comments">
        <div class="userAvatar">
          <span class="el-icon-user-solid"></span>
        </div>
        <el-input  type="textarea" class="textL" :rows="6" resize="none" v-model="commentContent"   placeholder="理性评论">
        </el-input>
      </div>
      <button class="submit" @click="commentSubmit">发布</button>
      <p class="commentsCont">{{ commentTotal }}条评论</p>
      <!-- 评论列表 -->
      <div class="commentContent">
        <div class="commentContent-item" v-for="(item,index) in commentData" :key="index">
          <div class="avatar">
            <img src="../assets/1.png" alt="">
          </div>
          <div class="userComment-content">
            <h6>{{ item.userId.name}}</h6>
            <p>{{ item.content }}</p>
            <span>{{$dayjs(item.date).format('YYYY-MM-DD HH:mm')}}</span>
          </div>
          <span class="serial-number">#{{index+1}}</span>
        </div>
      </div>
    </div>
    <div class="loadIng" v-if="isLoad==false">
      <el-empty  description="文章加载失败"></el-empty>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      artId: '',
      artData: '',
      textValue: '',
      isLoad: true,
      port: 6611,
      commentContent: '',
      commentData: [],
      commentTotal: ''
    }
  },
  methods: {
    // 获取文章数据
    async getArtData (a) {
      const { data } = await axios.get(`/api/getArtData?_id=${this.artId}&isLike=${a}`)
      console.log(data)
      if (data.status === 202) {
        this.isLoad = true
        this.$message.warning(data.msg)
      } else {
        this.textValue = data.artData.EditingValue.replace(/\\upLocal/g, `${this.$serve}\\/upLocal`)
        this.artData = data.artData
      }
    },
    // 发布评论
    async commentSubmit () {
      const commentData = {
        content: this.commentContent,
        artId: this.artId,
        userId: this.$store.state.user._id
      }
      const { data } = await axios.post('/api/comment', commentData)
      if (!data.status === 200) return this.$message.warning(data.msg)
      this.$message.success(data.msg)
      this.commentContent = ''
      this.getComment()
    },
    // 请求评论
    async getComment () {
      const { data } = await axios.get(`/api/commentAll?artId=${this.artId}`)
      console.log(data)
      if (data.status !== 200) return this.$message.warning(data.msg)
      this.commentData = data.commentData
      this.commentTotal = data.commentData.length
    },
    // 用户收藏
    async collection () {
      const { data } = await axios.get('/api/collection', {
        params: {
          artId: this.artId,
          userId: this.$store.state.user._id
        }
      })
      if (data.status === 202) return this.$message.warning(data.msg)
      this.$store.dispatch('a_userUpData')
      this.$message.success(data.msg)
      this.getArtData(1)
    },
    // 取消收藏
    async collectionNo () {
      const { data } = await axios.get('/api/collectionNo', {
        params: {
          artId: this.artId,
          userId: this.$store.state.user._id
        }
      })
      if (data.status === 202) return this.$message.warning(data.msg)
      this.$store.dispatch('a_userUpData')
      this.getArtData()
    }

  },
  created () {
    // 文章id
    this.artId = this.$route.params._id
    this.getArtData()
    // 获取文章评论数据
    this.getComment()
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style >
.contentArt {
  margin-left:  -100px;
  width: 135%;
  overflow: hidden;
}
.contentArt h2 {
  text-align: center;
  margin: 20px 0px 50px 0px;
}
.userData {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
}
.userRight .tag{
  display: inline-block;
}
.userLeft {
  display: flex;
  justify-content: space-between;
}
.avatar {
  width: 60px;
  height: 100%;
}
.avatar img {
  width: 100%;
}
.userName {
  font-size: 14px;
  margin-bottom: 20px;
}
.userDataS span{
  font-size: 13px;
  color: #888;
  margin-right: 8px;
}
.description {
  width: 100%;
  margin: 30px 0px 20px 0px;
  background-color: blanchedalmond;
}
.collection {
  width: 80px;
  height: 30px;
  border: 1px solid #ffd04b;
  color:#ffd04b;
  margin-left: 50%;
  transform: translate(-50%,0);
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  line-height: 30px;
  margin-bottom:60px;

}
.collection:hover{
  background-color: #ffd04b;
  color:#fff
}
.comments {
  /* position: absolute; */
  width: 100%;
  height: 140px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.userAvatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #888;
  text-align: center;
  line-height: 60px;
  font-size: 40px;
  color: #fff;

}

.comments .textL {
  /* border: 1px solid #888; */
  width: 85%;
  margin-right: 35px;
}
.el-textarea__inner:hover {
    border: 1px solid #ffd04b;
}
.el-textarea__inner:focus {
  border: 1px solid #ffd04b;
}
.submit {
  width: 65px;
  height: 30px;
  background-color: #ffd04b;
  border: none;
  color: #fff;
  text-align: center;
  line-height: 30px;
  float: right;
  margin: 10px 35px 0px 0px;
  overflow: hidden;
  border-radius: 4px;
  transform: translate(-15px,-50px);
  cursor: pointer;
}
.commentsCont {
  font-size: 18px;
  margin-top: 20px;
}
.commentContent {
  margin: 20px 0px 300px 0px;
}
.commentContent-item {
  position: relative;
  display: flex;
  border-bottom:1px solid #eee ;
  margin: 20px 0px 10px 0px;
}
.commentContent-item .avatar {
  margin:0 10px 30px 0;
}
.commentContent-item h6 {
  font-size: 14px;
  margin: 10px 0px 12px;
}
.commentContent-item p,
.commentContent-item span {
  font-size: 12px;
  color: #888;
}
.commentContent-item .serial-number {
  color: #000;
  position: absolute;
  top:0px;
  right: 30px;
  font-size: 16px;
}
</style>
