const db = require("./db")
const todos = require("./models/todos")
const users = require("./models/users")
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8888
const methodOverride = require('method-override')
const session = require('express-session')

app.use(session({secret: "secret"}))

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT)
})

todos.sync()
users.sync()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(methodOverride('_method'))

app.all('*', (req, res, next) => {
  next()
})

app.use('/todos', require('./routes/todos'))
app.use('/users', require('./routes/users'))

app.use((req, res) => {
  res.status(404).send('Page Not Found')
})