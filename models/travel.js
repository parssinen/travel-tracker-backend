const mongoose = require('mongoose')

const travelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  position: {
    lat: Number,
    lng: Number
  },
  title: String,
  text: String
})

travelSchema.statics.format = travel => {
  return {
    id: travel.id,
    user: travel.user,
    position: travel.position,
    title: travel.title,
    text: travel.text
  }
}

const Travel = mongoose.model('Travel', travelSchema)

module.exports = Travel
