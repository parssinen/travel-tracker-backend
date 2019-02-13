const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  travels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Travel' }]
})

userSchema.statics.format = user => {
  return {
    id: user.id,
    username: user.username,
    travels: user.travels
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User
