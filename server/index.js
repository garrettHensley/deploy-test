const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./.env')
const cors = require('cors')
const bodyParser = require('body-parser')
const TodoListRoutes = require('./routes/api/Todolist.js')
const path = require('path')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB database connected...'))
  .catch((e) => console.log(e))

app.use('/api/todoList', TodoListRoutes)
app.listen(process.env.PORT, () => console.log(`app listening at http://localhost:${process.env.PORT}`))