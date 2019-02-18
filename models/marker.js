const mongoose = require('mongoose')

const markerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  position: {
    lat: Number,
    lng: Number
  },
  title: String,
  text: String
})

markerSchema.statics.format = marker => {
  return {
    id: marker.id,
    user: marker.user,
    position: marker.position,
    title: marker.title,
    text: marker.text
  }
}

const Marker = mongoose.model('Marker', markerSchema)

module.exports = Marker
