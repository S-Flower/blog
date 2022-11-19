<template>
  <div>
    <div class="artBigArt">
      <artList :list="artList" @handleLoad="load"></artList>
    </div>
    <div class="tip">
      <p v-if="isBottom===false">正在加载中</p>
      <p v-else>我也是有底线的~</p>
    </div>
  </div>
</template>

<script>
import artList from '../../components/newHome/MyArtList.vue'
import axios from 'axios'
import { mapState } from 'vuex'
export default {

  name: 'NewArt',
  data () {
    return {
      artList: [],
      currentPage: 0,
      currentStrip: 5,
      inputValue: '',
      isBottom: false,
      sort: 'artDate',
      selectTime: null
    }
  },
  components: {

    artList
  },
  computed: {
    ...mapState(['selectValue'])
  },
  methods: {
    async getData () {
      if (this.isBottom === false) {
        this.currentPage++
        const { data } = await axios.get(`/api/artData?currentPage=${this.currentPage}&currentStrip=${this.currentStrip}&inputValue=${this.inputValue}&sort=${this.sort}`)
        if (data.artData.length === 0) return (this.isBottom = true)
        this.artList = [...this.artList, ...data.artData]
      }
    },
    load () {
      this.getData()
    }
  },
  // 头部搜索
  watch: {
    selectValue (value) {
      clearTimeout(this.selectTime)
      this.selectTime = setTimeout(() => {
        this.isBottom = false
        this.artList = []
        this.inputValue = value
        this.currentPage = 0
        this.currentStrip = 5
        this.getData()
      }, 300)
    }
  }
}
</script>

<style scoped>
.tip {
  margin: 20px 0 ;
}
.tip p {
  text-align: center;
  color: #555;
}
</style>
