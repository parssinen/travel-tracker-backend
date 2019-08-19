const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return response.status(400).send({ error: 'username is already taken' })
    }

    const user = new User({
      username: 'nuotio',
      name: 'nuotio',
      locationLatitude: 61.393202,
      locationLongitude: 28.299975
    })

    const savedUser = await user.save()
    response
      .status(200)
      .json(savedUser)
      .end()
  } catch (exception) {
    console.log(exception)
    response.status(500).send({ error: 'something went wrong' })
  }
})

module.exports = usersRouter
