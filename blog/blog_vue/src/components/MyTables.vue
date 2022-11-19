<template>
  <div>
        <el-table :data="List" border style="width: 100%" >
          <el-table-column v-for="(item,index) in label" :prop="item.prop" :label="item.label" align="center" :key="index">
            <!-- 注册日期 -->
            <template v-if="item.prop == 'date'" v-slot="{row}">
              <span>{{ $dayjs(row.date).format('YYYY-MM-DD') }}</span>
            </template>
            <!-- 用户权限 -->
            <template v-else-if="item.prop =='make'" v-slot="{row}">
              <el-tag v-if="row.make===0" type="warning">管理用户</el-tag>
              <el-tag v-else type="info">普通用户</el-tag>
            </template>
            <!-- 标签 -->
            <template v-else-if="item.prop =='label'" v-slot="{row}">
             <span v-for="item in row.label" :key="item">
              <el-tag size="small" type="warning">{{item}}</el-tag>
             </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140px" align="center">
              <template v-slot="{row}">
              <el-button v-if='isView==0' type="primary" icon="el-icon-edit" circle @click="reviseUser(row)"></el-button>
              <el-button v-else type="primary" icon="el-icon-view" circle @click="reviseUser(row)"></el-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @confirm="editUser(row)">
                <el-button slot="reference" type="danger" icon="el-icon-delete" circle></el-button>
              </el-popconfirm>
              </template>
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default {
  props: ['List', 'label', 'isView'],
  data () {
    return {
      // user: ''
    }
  },
  methods: {
    editUser (row) {
      this.$emit('edit', 2, row)
    },
    reviseUser (row) {
      this.$emit('edit', 1, row)
    }
  }
}
</script>

<style >
.el-table tr{
  height: 65px !important;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before{
  z-index: -1;
}
.el-button.is-circle {
  margin-right: 10px;
}
</style>
