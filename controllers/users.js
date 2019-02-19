const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return response.status(400).send({ error: 'username is already taken' })
    }

    const saltRounds = 10
    const hash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: hash
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
