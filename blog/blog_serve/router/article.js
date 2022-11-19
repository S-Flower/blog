const app = require('../app')
const formidable = require('formidable');
const express = require('express')
const path = require('path');
const Art = require('../data/Art')

const form = formidable({
  uploadDir: path.join(__dirname, '../', 'public', 'upLocal'),
  keepExtensions: true
});

// 用户上传图片的接口
app.post('/api/upLocal', async (req, res) => {

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return res.send({
        status: 202,
        msg: '上传失败，请重试'
      })
    }
    const upLocalPath = files.file.filepath.split('public')[1]
    res.send({
      status: 200,
      msg: '上传成功',
      upLocalPath
    })
  });

})
// 用户创建文章接口
app.post('/api/Art', async (req, res) => {
  // 判断是否有id有id就修改没有就添加
  if (req.body._id) {
    const artData = await Art.findOneAndUpdate({ _id: req.body._id }, req.body)
    const artDataEd = await Art.findOne({ _id: req.body._id })
    try {
      res.send({
        status: 200,
        msg: '修改成功',
        artDataEd
      })
    } catch (err) {
      res.send({
        status: 202,
        msg: '修改失败',
      })
    }
  } else {
    try {
      // 添加文章时间
      req.body.artDate = +new Date()
      // 往数据库添加数据
      const ArtData = await Art.create(req.body)
      res.send({
        status: 200,
        msg: '提交成功',
        ArtData
      })
    } catch (err) {
      res.send({
        status: 202,
        msg: '提交失败，请重试'
      })
    }
  }

})
// 用户请求文章数据
app.get('/api/artData', async (req, res) => {
  const { currentPage, currentStrip, inputValue, sortsKey, selectTag } = req.query
  let sort = '-artDate'
  if (sortsKey === 'lookCont') sort = '-lookCont'
  const Total = await Art.find({ title: { $regex: inputValue } }).count()
  let findObj = { title: { $regex: inputValue } }
  if (selectTag) {
    findObj.label = { $in: [selectTag] }
  }
  // 判断一页几条每一页怎么渲染
  const artData = await Art.find(findObj).sort(sort).skip((currentPage - 1) * currentStrip).limit(currentStrip).populate('author')

  console.log(artData);
  try {
    res.send({
      status: 200,
      msg: '文章数据请求成功',
      artData,
      Total
    })
  } catch (err) {
    res.send({
      status: 202,
      msg: '文章数据请求失败'
    })
  }
})
// 文章修改接口
app.delete('/api/deleteArt', async (req, res) => {
  const artData = await Art.findOneAndDelete({ _id: req.query._id })
  if (!artData) return res.send({
    status: 202,
    msg: '删除失败，请重试'
  })
  res.send({
    status: 200,
    msg: '删除成功'
  })
})
// 总览文章请求
app.get('/api/allArt', async (req, res) => {
  const artData = await Art.find().select('title artDate').sort('-artDate')
  try {
    res.send({
      status: 200,
      artData
    })
  } catch (err) {
    res.send({
      status: 202,
      msg: '数据请求错误，请重试'
    })
  }
})
// 请求单个文章数据 
app.get('/api/getArtData', async (req, res) => {
  const { _id, isLike } = req.query
  console.log(isLike);
  try {
    const artData = await Art.findOne({ _id: _id }).populate('author')
    if (isLike) {
      artData.lookCont++
      await artData.save()
    }
    res.send({
      msg: '文章请求成功',
      status: 200,
      artData
    })
  } catch (err) {
    res.send({
      err,
      msg: '文章请求失败',
      status: 202,
    })
  }
})
// 文章标签
app.get('/api/tags', async (req, res) => {
  const tagsData = await Art.find().select('label -_id')
  let tagsArr = []
  tagsData.forEach(item => {
    item.label.forEach(tag => {
      // if (!tagsArr.includes(tag)) tagsArr.push(tag)
      tagsArr.push(tag)
    })
  })
  // 数组去重
  let tagsArrEd = [...new Set(tagsArr)]
  try {
    res.send({
      status: 200,
      tagsArrEd
    })
  } catch (err) {
    res.send({
      status: 202,
    })
  }
})


