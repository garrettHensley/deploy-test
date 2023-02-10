const { Router } = require('express')
const Todo = require('../../models/Todo')

const router = Router()

router.get('/', async (req, res) => {
  try {
    const todoList = await Todo.find()
    if(!todoList) throw new Error('no todolist found')
    res.status(200).json(todoList)
  } catch(error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  const newTodo = new Todo(req.body)
  try {
    const todo = await Todo.create(req.body, (e, data) => {
      if(e) {
        console.log(e)
      }
      else {
        res.status(200).json(data)
      }
    })
    // if(!todo) throw new Error('something went wrong saving')
    // res.status(200).json(todo)
  } catch(error) {
    res.status(500).json({message: error.message})
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const removed = await Todo.findByIdAndDelete(id)
    if(!removed) throw Error('something went wrong')
    res.status(200).json(removed)
  } catch(error) {
    res.status(500).json({ message: error.message})
  }
})

module.exports = router