const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', {likes: 1, author: 1, title: 1, url: 1})
    response.json(users.map(User.format)).end()
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User
        .findById(request.params.id)
        .populate('blogs')

    if (user) {
        response.json(User.format(user)).end()
    } else {
        response.status(404).json({ error: 'invalid id' })
    }
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const existingUser = await User.find({ username: body.username })
        if (existingUser.length > 0) {
            return response.status(400).json({ error: 'username must be unique' })
        }
        if (body.password.length < 3) {
            return response.status(400).json({ error: 'password must be at least three characters long' })
        }

        const saltRounds = 10
        const hash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash: hash,
            adult: !body.adult ? true : body.adult,
        })

        const savedUser = await user.save()
        response.status(200).json(savedUser).end()

    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = usersRouter
