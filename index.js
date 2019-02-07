const path = require('path')
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/travels')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')

morgan.token('data', (request, response) => {
  return JSON.stringify(request.body)
})
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

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
/*app.use('/api/blogs', blogsRouter)*/
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(express.static('build'))
app.use(cors())

/*const data = {}

app.get('/data', (req, res) => {
  res.json(data)
})*/

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'))
})

const server = http.createServer(app)

if (process.env.NODE_ENV !== 'test') {
  server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
}
server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app,
  server
}

/*const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})*/
