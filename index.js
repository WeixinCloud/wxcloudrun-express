const express = require('express')
const cors = require('cors')
const { init: initDB, Todo } = require('./db')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/api/todos', async (req, res) => {
  try {
    const list = await Todo.findAll();
    res.send({
      code: 0,
      data: list
    })
  } catch (e) {
    res.status(500).send({
      code: 1,
      errorMsg: e.message
    })
  }
})

app.post('/api/todos', async (req, res) => {
  const { title, status } = req.body
  try {
    const todo = await Todo.create({ title, status })
    res.send({
      code: 0,
      data: todo
    })
  } catch (e) {
    res.status(500).send({
      code: 1,
      errorMsg: e.message
    })
  }
})

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params
  try {
    await Todo.destroy({
      where: { id: Number(id) }
    })
    res.send({ code: 0 })
  } catch (e) {
    res.status(500).send({
      code: 1,
      errorMsg: e.message
    })
  }
})

app.put('/api/todos', async (req, res) => {
  const { title, status, id } = req.body
  try {
    await Todo.update({ title, status }, {
      where: { id: Number(id) }
    })
    res.send({ code: 0 })
  } catch (e) {
    res.status(500).send({
      code: 1,
      errorMsg: e.message
    })
  }
})

const port = process.env.PORT || 4000

async function bootstrap() {
  await initDB()
  app.listen(port, () => {
    console.log('启动成功', port)
  })
}

bootstrap();

