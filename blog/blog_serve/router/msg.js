const app = require('../app')
const msg = require('../data/msg')
const express = require('express')
// 接受用户留言
app.post('/api/msg', async (req, res) => {
  const msgData = await msg.create(req.body)
  try {
    res.send({
      msg: '留言成功',
      status: 200
    })
  } catch (err) {
    res.send({
      msg: '留言失败,请重试',
      status: 202
    })
  }
})
// 请求用户留言数据
app.get('/api/msgData', async (req, res) => {
  const { currentPage, currentStrip } = req.query
  const Total = await msg.find().count()
  const msgData = await msg.find().skip((currentPage - 1) * currentStrip).limit(currentStrip).populate('author')
  try {
    res.send({
      status: 200,
      msgData,
      Total
    })
  } catch (err) {
    res.send({
      status: 202,
      msg: '数据请求失败，请重试'
    })
  }
})
// 删除留言
app.delete('/api/deleteMsg', async (req, res) => {
  const msgData = await msg.findOneAndDelete({ _id: req.query })
  if (msgData) return res.send({
    msg: '删除成功',
    status: 200
  })
  res.send({
    msg: '删除失败',
    status: 202
  })
})