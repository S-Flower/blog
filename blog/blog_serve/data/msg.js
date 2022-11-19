// 导入数据模块
const mongoose = require('mongoose')
// 创建规则
const msgSchema = new mongoose.Schema({
  name: String,
  message: String,
  outline: Number,
  textarea: String,
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }
})
//创建集合
const msg = mongoose.model('msg', msgSchema)
// 导出集合
module.exports = msg