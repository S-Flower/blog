<template>
  <div>
    <div class="artList infinite-list" v-infinite-scroll="load">
      <div class="artListItem infinite-list-item" v-for="item in list" :key="item._id" >
        <div class="left">
          <h3 @click="Jump(item._id)">{{ item.title }}</h3>
          <span>{{ item.description }}</span>
          <p style="color:#888">
            <i class="el-icon-view"><em>{{ item.lookCont }}</em></i>
            <i class="el-icon-chat-dot-round"><em>{{ item.comments }}</em></i>
            <i class="el-icon-star-on"><em>{{ item.like }}</em></i>
            <i class="el-icon-watch"><em>{{ $dayjs(item.artDate).format('YYYY-MM-DD HH:mm:ss') }}</em></i>
          </p>
        </div>
        <div class="right">
         <img :src="'http://localhost:6611/'+item.upLocalPath" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
    }
  },
  methods: {
    load () {
      this.$emit('handleLoad')
    },
    Jump (_id) {
      if (this.$store.state.token == null) return this.$message.warning('请登录')
      window.open(location.origin + '/#' + '/home/content/' + _id)
    }
  }
}
</script>

<style scoped>
.artList {
  width: 100%;
}
.artListItem {
  height: 140px;
  padding: 10px 0px ;
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid #ccc;
  cursor: pointer;
}
.artListItem .left {
display: flex;
flex-direction: column;
justify-content: space-between;
}
.artListItem .left span {
  margin-top: -40px;
  color: #444;
}
.artListItem .left i {
  cursor: pointer;
  margin-right: 10px;
}
.artListItem .right {
  width: 120px;
  height: 120px;
}
.right img {
  width: 100%;
  border-radius: 5px;
}
</style>
