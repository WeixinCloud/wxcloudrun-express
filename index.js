const express = require('express')
const cors = require('cors')
const { init: initDB, Counter } = require('./db')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
// todo: logger

app.get('/', async (req, res) => {
  res.send('index.html')
})

app.post('/api/count', async (req, res) => {
  const { action } = req.body
  if (action === 'inc') {
    await Counter.create()
  } else if (action === 'clear') {
    await Counter.xxx()
  }
  res.send({
    code: 0,
    data: await Counter.count()
  })
})

app.get('/api/count', async (req, res) => {
  const result = await Counter.count()
  res.send({
    code: 0,
    data: result
  })
})

app.get('/api/wx_openid', async (req, res) => {
  if (req.headers['x-wx-source']) {
    res.send(req.headers['x-wx-openid'])
  }
})

const port = process.env.PORT || 3000

async function bootstrap() {
  await initDB()
  app.listen(port, () => {
    console.log('启动成功', port)
  })
}

bootstrap();

