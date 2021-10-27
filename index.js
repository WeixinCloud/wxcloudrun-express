const express = require('express')
const { init: initDB, User } = require('./db')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/user', async (req, res) => {
  try {
    const list = await User.findAll();
    res.send('用户列表：\n' + JSON.stringify(list))
  } catch (e) {
    res.status(500).send(e)
  }
})

app.post('/user', async (req, res) => {
  const { name, age, phone, email } = req.body
  try {
    const user = await User.create({ name, age, phone, email })
    res.send({ status: 'ok', id: user.id })
  } catch (e) {
    res.status(500).send(e)
  }
})

app.delete('/user', async (req, res) => {
  const { id } = req.query
  if (id === undefined) {
    res.status(400).send('`id` is required')
  }
  try {
    const result = await User.destroy({
      where: { id: Number(id) }
    })
    res.send({ status: 'ok', removed: result })
  } catch (e) {
    res.status(500).send(e)
  }
})

app.put('/user', async (req, res) => {
  const { id } = req.query
  if (id === undefined) {
    res.status(400).send('`id` is required')
  }
  const { name, age, phone, email } = req.body
  try {
    const result = await User.update({ name, age, phone, email }, {
      where: { id: Number(id) }
    })
    res.send({ status: 'ok', updated: result[0] })
  } catch (e) {
    res.status(500)
    res.send(e)
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

