const express = require('express')
const CB = require('nodejieba')
const version = '0.0.1'
const testtext = process.env.CUT_TEXT || '欢迎使用微信云托管'
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

try {
  console.log(`【${version}】分词测试成功！`, CB.extract(testtext, 5))
} catch (e) {
  console.log(`【${version}】分词测试失败！`, e)
}

app.get('/', (req, res) => {
  res.send('欢迎使用微信云托管！')
})

app.get('/cut', (req, res) => {
  const { word } = req.query
  console.log('GET搜索关键词：', word)
  res.send({
    keys: cut(word),
    version
  })
})

app.post('/cut', async (req, res) => {
  const { word } = req.body
  console.log('POST搜索关键词：', word)
  res.send({
    keys: cut(word),
    version
  })
})

function cut (word) {
  return CB.extract(word || testtext, 10).map(item => item.word)
}

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(version, '启动成功', port)
})
