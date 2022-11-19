<template>
  <div>
   <div class="boxHear">
    <div class="input">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input" size="small">
      </el-input>
    </div>
    <div class="button">
      <template>
        <slot name="addUser"></slot>
      </template>
    </div>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  },
  methods: {
  },
  watch: {
    input (value) {
      this.$emit('select', value)
    }
  }
}
</script>

<style scoped>
.boxHear {
  height: 40px;
}
.input {
  width: 300px;
  float: left;
}
.button {
  float: right;
}

</style>
