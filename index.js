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

morgan.token('data', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.tokenExtractor)
app.use(morgan(`:method :url :data :status :response-time ${'ms'}`))

mongoose.set('useFindAndModify', false)
mongoose
  .connect(
    'mongodb://username:password1@ds123465.mlab.com:23465/travel-tracker-dev',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch(error => {
    console.log(error)
  })

app.use('/api/markers', markersRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get('/*', (request, response) => {
  res.sendFile(path.join(__dirname, './build/index.html'))
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
