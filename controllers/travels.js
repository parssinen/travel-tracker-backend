const travelsRouter = require('express').Router()
const Travel = require('../models/travel')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

travelsRouter.get('/', async (request, response) => {
  const travels = await Travel.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(travels.map(Travel.format)).end()
})

travelsRouter.get('/:id', async (request, response) => {
  const travel = await Travel.findById(request.params.id).populate('travel', {
    username: 1,
    name: 1
  })
  if (travel) {
    response.json(Travel.format(blog)).end()
  } else {
    response.status(404).json({ error: 'invalid id' })
  }
})

travelsRouter.post('/', async (request, response) => {
  console.log('1')
  console.log(request.body)
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!body.position) {
      return response.status(400).json({ error: 'position missing' })
    }
    console.log('2')

    const user = await User.findById(decodedToken.id)
    console.log('3')

    const travel = new Travel({
      user: user.id,
      position: body.position,
      title: body.title,
      text: body.text
    })

    const savedTravel = await travel.save()
    console.log('4')

    user.travels = user.travels.concat(savedTravel._id)
    await user.save()
    console.log('5')

    response.json(Travel.format(travel))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
    console.log('6')
  }
})

travelsRouter.put('/:id', async (request, response) => {
  const travel = await Travel.findById(request.params.id)
  if (travel) {
    const body = request.body
    const updatedTravel = {
      title: body.title,
      text: body.text
    }
    const update = await Travel.findByIdAndUpdate(travel.id, updatedTravel)
    response.json(update).end()
  } else {
    response.status(400).json({ error: 'invalid id' })
  }
})

travelsRouter.delete('/:id', async (request, response) => {
  try {
    const travel = await Travel.findById(request.params.id)
    if (!travel) {
      return response.status(400).json({ error: 'invalid id' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    if (travel.user.toString() === user.id.toString()) {
      await Travel.findByIdAndRemove(travel.id)
      response.status(204).end()
    }
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

module.exports = travelsRouter
