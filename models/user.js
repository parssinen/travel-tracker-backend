const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  markers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Marker' }]
})

userSchema.statics.format = user => {
  return {
    id: user.id,
    username: user.username,
    markers: user.markers
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User
