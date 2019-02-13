const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  travels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = user => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    travels: user.travels
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User
