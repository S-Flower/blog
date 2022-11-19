<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HomeView from './views/HomeView.vue'
export default {
  name: 'app',
  components: {
  },
  // 在生命周期中调用vuex中actoins异步函数发送请求
  created () {
    this.$store.dispatch('a_userUpData')
  }
}
</script>
<style>
* {
  margin: 0px;
  padding: 0px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
li {
  list-style: none;
}
div {
    box-sizing: border-box;
}
i,
em{
  font-style: normal;
}
</style>
