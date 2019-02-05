const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: Number,
    author: String,
    title: String,
    url: String
})

blogSchema.statics.format = (blog) => {
    return {
        id: blog.id,
        user: blog.user,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url
    }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
