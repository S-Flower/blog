// 导入数据库模块
const mongoose = require('mongoose')
// 创建数据库规则
const userSchema = new mongoose.Schema({
  name: String,
  user: String,
  password: String,
  make: {
    type: Number,
    default: 1
    // 0代表管里用户  1代表普通用户
  },
  date: Number,
  CollectionList: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Art'

  }]
})

// 创建集合
const User = mongoose.model('User', userSchema)

// 导出集合
module.exports = User
// 更新属性
// User.updateMany({ CollectionList: [] }).then(() => {
//   console.log('更新成功');
// })
