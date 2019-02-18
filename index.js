const path = require('path')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const markersRouter = require('./controllers/markers')
const config = require('./utils/config')

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use('/api/markers', markersRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(express.static('build'))

app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, './build/index.html'))
})

morgan.token('data', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(morgan(`:method :url :data :status :response-time ${'ms'}`))

mongoose.set('useFindAndModify', false)
mongoose
  .connect(
    'mongodb://username:password1@ds139435.mlab.com:39435/travel-tracker',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch(error => {
    console.log(error)
  })

const server = http.createServer(app)
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app,
  server
}
