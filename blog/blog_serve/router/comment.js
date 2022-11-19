const app = require('../app')
const Art = require('../data/Art')
const comment = require('../data/comment')
const User = require('../data/User')

// 添加评论
app.post('/api/comment', async (req, res) => {
  const commentFrom = req.body
  commentFrom.date = +new Date()
  const commentData = await comment.create(commentFrom)
  const artData = await Art.findOne({ _id: commentFrom.artId })
  artData.comments++
  await artData.save()
  if (!commentData) return res.send({
    msg: '发布失败，请重试',
    status: 202
  })
  res.send({
    msg: '发布成功',
    status: 200,
  })
})
// 请求评论
app.get('/api/commentAll', async (req, res) => {
  const commentData = await comment.find({ artId: req.query.artId }).populate('userId')
  try {
    res.send({
      status: 200,
      commentData,
    })
  } catch (err) {
    res.send({
      status: 202,
      msg: '评论获取失败，请重试'
    })
  }
})
// 分页请求评论
app.get('/api/commentPage', async (req, res) => {
  const { currentPage, currentStrip, } = req.query
  const Total = await comment.find().count()
  // 判断一页几条每一页怎么渲染
  const commentData = await comment.find().skip((currentPage - 1) * currentStrip).limit(currentStrip).populate('userId').populate('artId')
  try {
    res.send({
      status: 200,
      msg: '评论数据请求成功',
      commentData,
      Total
    })
  } catch (err) {
    res.send({
      status: 202,
      msg: '评论数据请求失败'
    })
  }
})
// 评论删除
app.delete('/api/deleteComment', async (req, res) => {
  const CommentData = await comment.findOneAndDelete({ _id: req.query })
  if (CommentData) return res.send({
    msg: '删除成功',
    status: 200
  })
  res.send({
    msg: '删除失败',
    status: 202
  })
})