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
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!body.position) {
      return response.status(400).json({ error: 'position missing' })
    }

    const user = await User.findById(decodedToken.id)

    const travel = new Travel({
      user: user.id,
      position: body.position,
      title: body.title,
      text: body.text
    })

    const savedTravel = await travel.save()

    user.travels = user.travels.concat(savedTravel._id)
    await user.save()

    response.json(Travel.format(savedTravel))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

travelsRouter.put('/:id', async (request, response) => {
  const travel = await Travel.findById(request.params.id)
  if (travel) {
    const body = request.body
    const updatedTravel = {
      id: body.id,
      user: body.user,
      position: body.position,
      title: body.title,
      text: body.text
    }

    await Travel.findByIdAndUpdate(travel.id, updatedTravel)
    response.json(updatedTravel).end()
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
