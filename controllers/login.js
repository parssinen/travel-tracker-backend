const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ username: 'nuotio' })

  console.log('body', body)

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180
  }

  function distanceInKmBetweenEarthCoordinates(lat1, lon1) {
    let lat2 = user.locationLatitude
    let lon2 = user.locationLongitude

    var earthRadiusKm = 6371

    var dLat = degreesToRadians(lat2 - lat1)
    var dLon = degreesToRadians(lon2 - lon1)

    lat1 = degreesToRadians(lat1)
    lat2 = degreesToRadians(lat2)

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return earthRadiusKm * c
  }

  const distanceBetween = distanceInKmBetweenEarthCoordinates(
    body.inputLat,
    body.inputLon
  )

  console.log('body', body)

  console.log('Between', distanceBetween)

  if (distanceBetween < 5) {
    const userForToken = {
      username: 'nuotio',
      id: user._id
    }
    const token = jwt.sign(userForToken, 'process.env.SECRET')
    response.status(200).send({ token, username: user.username, id: user.id })
  } else {
    return response.status(401).send({ error: 'Väärin :/' })
  }
})

module.exports = loginRouter
