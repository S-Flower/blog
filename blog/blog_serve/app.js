// 导入服务器模块
const axios = require('axios')
const express = require('express')
const path = require('path')
// 开启服务器
const app = express()
module.exports = app
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// 配置静态资源的获取 public文件夹 作为静态资源的根目录
app.use(express.static(path.join(__dirname, 'public')))

require('./data/concent')

require('./router/UserRouter')
require('./router/article')
require('./router/msg')
require('./router/comment')

// 开启服务器监听
app.listen('6611', () => {

  console.log('服务器开启成功')
})