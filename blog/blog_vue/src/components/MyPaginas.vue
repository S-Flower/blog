<template>
  <div>
<el-pagination
background
 @size-change="handleSizeChange"
 @current-change="handleCurrentChange"
 :current-page="currentPage"
 :page-sizes="[5, 3, 2, 1]"
 :page-size="5"
 layout="total, sizes, prev, pager, next, jumper"
 :total="Total-0">
</el-pagination>
  </div>
</template>

<script>

export default {
  props: ['Total'],
  data () {
    return {
      currentStrip: 5,
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      this.currentStrip = val
      this.change()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.change()
    },
    change () {
      this.$emit('change', this.currentPage, this.currentStrip)
    }
  }
}

</script>

<style >
</style>
