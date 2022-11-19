const mongoose = require('mongoose')
// 创建规则
const commentSchema = new mongoose.Schema({
  content: String,
  artId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Art'
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  date: Number,
  // 联合查询
})
// 创建集合
const comment = mongoose.model('comment', commentSchema)
// 导出集合
module.exports = comment
