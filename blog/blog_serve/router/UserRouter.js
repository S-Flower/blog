const app = require('../app')
const express = require('express')
const axios = require('axios')
const Art = require('../data/Art')
// 导入token
const jwt = require('jsonwebtoken')
// 导入数据库集合
const User = require('../data/User')
const { updateOne } = require('../data/User')

// 毒鸡汤请求
app.get('/api/text', async (req, res) => {
  const { data } = await axios.get('http://api.lkblog.net/ws/api.php')
  res.send(data)
})
// 用户注册请求
app.post('/api/user', async (req, res) => {
  const FindUser = await User.findOne({ user: req.body.user })
  if (FindUser) return res.send({
    status: 202,
    msg: '用户名已存在，请重试'
  })
  try {
    req.body.date = +new Date()
    const user = User.create(req.body)
    res.send({
      status: 200,
      msg: '注册成功'
    })
  } catch (err) {
    res.send({
      status: 202,
      msg: '注册错误，请重试'
    })
  }
})
// 用户登录接口
app.post('/api/login', async (req, res) => {
  const FindUser = await User.findOne({ user: req.body.user })
  // 判断用户输入账户是否正确
  if (!FindUser) return res.send({
    status: 202,
    msg: '用户名不存在'
  })
  if (FindUser.password != req.body.password) return res.send({
    status: 202,
    msg: '密码输入错误'
  })
  // 生成token码
  const token = jwt.sign({ id: FindUser._id }, 'blog')

  res.send({
    status: 200,
    msg: '登陆成功',
    FindUser,
    token
  })
})
// 判断用户token码
app.get('/api/token', async (req, res) => {
  // 拿到本地token进行解密
  const LocalToken = jwt.verify(req.headers.token, 'blog');
  try {
    const LocalUser = await User.findOne({ _id: LocalToken.id })
    res.send({
      status: 200,
      msg: '本地数据读取成功，已登录',
      LocalUser,
      LocalToken
    })
  } catch (err) {
    res.send({
      status: 202,
      msg: '本地数据读取错误，请重试'
    })
  }
})
// 后台管理请求用户数据
app.get('/api/UserShow', async (req, res) => {
  const { currentPage, currentStrip, inputValue } = req.query
  // 数据库的总数
  const Total = await User.find({ name: { $regex: inputValue } }).count()
  // 判断一页几条每一页怎么渲染
  const UserData = await User.find({ name: { $regex: inputValue } }).skip((currentPage - 1) * currentStrip).limit(currentStrip)
  try {
    res.send({
      UserData,
      Total,
      status: 200
    })
  } catch (err) {
    res.send({
      status: 202
    })
  }
})
// 删除用户
app.delete('/api/userDelete', async (req, res) => {
  const UserData = await User.findOneAndDelete({ _id: req.query })
  await Art.deleteMany({ author: req.query })
  try {
    if (UserData) return res.send({
      msg: '删除成功',
      status: 200
    })
  } catch (err) {
    res.send({
      msg: '删除错误，请重试',
      status: 202
    })
  }

})
// 修改用户
app.post('/api/userUp', async (req, res) => {
  const userUp = await User.findOneAndUpdate({ _id: req.body._id }, req.body)
  const userUpEd = await User.findOne({ _id: req.body._id })
  try {
    res.send({
      status: 200,
      msg: '修改成功',
      userUpEd
    })
  } catch (err) {
    res.send({
      status: 202,
      msg: '修改错误，请重试'
    })
  }
})
// 用户收藏文章
app.get('/api/collection', async (req, res) => {
  const { artId, userId } = req.query
  const UserData = await User.findOne({ _id: userId })
  UserData.CollectionList.push(artId)
  const ArtData = await Art.findOne({ _id: artId })
  ArtData.like++
  await ArtData.save()
  await UserData.save()
  try {
    res.send({
      msg: '收藏成功',
      status: 200,
    })
  } catch (err) {
    res.send({
      msg: '收藏失败，请重试',
      status: 202,
    })
  }
})
// 用户取消文章收藏
app.get('/api/collectionNo', async (req, res) => {
  const { artId, userId } = req.query
  const UserData = await User.findOne({ _id: userId })
  const artIndex = UserData.CollectionList.indexOf(artId)
  const UserDataEd = UserData.CollectionList.splice(artIndex, 1)
  const ArtData = await Art.findOne({ _id: artId })
  if (ArtData.like != 0) {
    ArtData.like--
  }
  await ArtData.save()
  await UserData.save()
  try {
    res.send({
      status: 200,
    })
  } catch (err) {
    res.send({
      msg: '操作失败，请重试',
      status: 202,
    })
  }
})
// 用户请求收藏文章
app.get('/api/userCollection', async (req, res) => {
  const { Page, Strip, inputValue } = req.query
  const Data = await User.findOne({ _id: req.query._id }).populate('CollectionList')
  const jumpPage = (Page - 1) * Strip

  var currentSearch = Data.CollectionList
  if (inputValue) {
    var currentSearch = currentSearch.filter(item => {
      return item.title.includes(inputValue)
    })
  }
  const DataEd = currentSearch.slice(jumpPage, jumpPage + Strip)
  try {
    res.send({
      status: 200,
      msg: '文章数据请求成功',
      DataEd,
      Total: Data.CollectionList.length
    })
  } catch (err) {
    res.send({
      status: 202,
      msg: '文章数据请求失败'
    })
  }
})
// 修改用户信息
app.post('/api/reviseUser', async (req, res) => {
  const { _id, nickName, password } = req.body
  console.log(_id, nickName, password);
  if (!password) {
    const UserData = await User.findOneAndUpdate({ _id: _id }, { name: nickName })
  }
  const UserData = await User.findOneAndUpdate({ _id: _id }, { password: password })
  const NewUserData = await User.find({ _id: _id })
  try {
    res.send({
      msg: '修改成功',
      status: 200,
      NewUserData
    })
  } catch (err) {
    res.send({
      msg: '修改失败，请重试',
      status: 202,
    })
  }
})