const blogsRouter = require('express').Router()
const Blog = require('../models/travel')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(Blog.format)).end()
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog
        .findById(request.params.id)
        .populate('user', { username: 1, name: 1 })
    if (blog) {
        response.json(Blog.format(blog)).end()
    } else {
        response.status(404).json({ error: 'invalid id' })
    }
})

blogsRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!body.title) {
            return response.status(400).json({ error: 'title missing' })
        }
        if (!body.url) {
            return response.status(400).json({ error: 'url missing' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: !body.likes ? 0 : body.likes,
            user: user.id
        })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(Blog.format(blog))

    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong...' })
        }
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        const body = request.body
        const updatedBlog = {
            title: body.title,
            url: body.url,
            likes: body.likes
        }
        const update = await Blog.findByIdAndUpdate(blog.id, updatedBlog)
        response.json(update).end()
    } else {
        response.status(400).json({ error: 'invalid id' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (!blog) {
            return response.status(400).json({ error: 'invalid id' })
        }

        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)
        if (blog.user.toString() === user.id.toString()) {
            await Blog.findByIdAndRemove(blog.id)
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

module.exports = blogsRouter
