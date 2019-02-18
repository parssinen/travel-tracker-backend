const markersRouter = require('express').Router()
const Marker = require('../models/marker')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

markersRouter.get('/', async (request, response) => {
  const markers = await Marker.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(markers.map(Marker.format)).end()
})

markersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!body.position) {
      return response.status(400).send({ error: 'position missing' })
    }

    const user = await User.findById(decodedToken.id)

    const marker = new Marker({
      user: user.id,
      position: body.position,
      title: body.title,
      text: body.text
    })

    const savedMarker = await marker.save()

    user.markers = user.markers.concat(savedMarker._id)
    await user.save()

    response.json(Marker.format(savedMarker))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).send({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).send({ error: 'something went wrong' })
    }
  }
})

markersRouter.put('/:id', async (request, response) => {
  const marker = await Marker.findById(request.params.id)
  if (marker) {
    const body = request.body
    const updatedMarker = {
      id: body.id,
      user: body.user,
      position: body.position,
      title: body.title,
      text: body.text
    }

    await Marker.findByIdAndUpdate(marker.id, updatedMarker)
    response.json(updatedMarker).end()
  } else {
    response.status(400).send({ error: 'invalid id' })
  }
})

markersRouter.delete('/:id', async (request, response) => {
  try {
    const marker = await Marker.findById(request.params.id)
    if (!marker) {
      return response.status(400).send({ error: 'invalid id' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).send({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    if (marker.user.toString() === user.id.toString()) {
      await Marker.findByIdAndRemove(marker.id)
      response.status(204).end()
    }
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).send({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).send({ error: 'something went wrong' })
    }
  }
})

module.exports = markersRouter
