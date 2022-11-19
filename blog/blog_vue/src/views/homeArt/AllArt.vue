<template>
  <div style="padding:50px">
    <el-timeline>
      <el-timeline-item v-for="(v,k) in artList "  :key="k" :timestamp="k" placement="top" icon='el-icon-time' size="normal">
        <el-card >
          <div class="artContent" v-for="item in v" :key="item._id">
            <span @click="Jump(item._id)">{{item.title}}</span>
            <p>{{ $dayjs(item.artDate).format('YYYY-MM-DD HH:mm')}}</p>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      artList: {},
      artList4: [],
      artList2: {
        '2012-09': [{ title: 'ddd', artDate: '1212132132' }],
        '2012-01': [{ title: 'ddd', artDate: '1212132132' }]
      },
      artList3: [
        { data: '2012-09', list: [{ title: 'ddd', artDate: '1212132132' }, { title: 'ddd', artDate: '1212132132' }] },
        { data: '2012-09', list: [{ title: 'ddd', artDate: '1212132132' }, { title: 'ddd', artDate: '1212132132' }] },
        { data: '2012-09', list: [{ title: 'ddd', artDate: '1212132132' }, { title: 'ddd', artDate: '1212132132' }] }
      ]
    }
  },
  methods: {
    Jump (_id) {
      if (this.$store.state.token === null) return this.$message.warning('请登录')
      window.open(location.origin + '/#' + '/home/content/' + _id)
    }
  },
  async created () {
    const { data } = await axios.get('/api/allArt')
    data.artData.forEach(item => {
      const currentMoth = this.$dayjs(item.artDate).format('YYYY-MM')
      if (!this.artList[currentMoth]) {
        this.$set(this.artList, currentMoth, [item])
      } else {
        this.artList[currentMoth].push(item)
      }
    })
  }
}
</script>

<style  scoped>
.artContent {
  margin-bottom: 18px;
}
</style>

<style>
.el-timeline-item__icon::before {
  color: #ffd04b;
  font-size: 30px;
}
.el-timeline-item__timestamp {
  font-size: 26px;
  transform: translate(0,-8px);
  color: #333;
}

.el-card__body span {
  font-size: 16px;
  color: #303133;
  cursor: pointer;

}
.el-card__body span:hover {
  color: #ffd04b;
}
.el-card__body p {
  font-size: 13px;
  color: 13px;
  margin-top: 5px;
}
</style>
