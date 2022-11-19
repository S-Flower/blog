// 导入数据库模块
const mongoose = require('mongoose')
// 创建数据库规则
const ArtSchema = new mongoose.Schema({
  title: String,
  label: Array,
  description: String,
  upLocalPath: String,
  EditingValue: String,
  artDate: Number,
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  lookCont: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  like: {
    type: Number,
    default: 0
  }
})

// 创建集合
const Art = mongoose.model('Art', ArtSchema)
// 导出集合
module.exports = Art