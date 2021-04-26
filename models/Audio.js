const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    default: "Undefined"
  },
  artist: {
    type: String,
    default: "Undefined"
  },
  size: {
  	type: Number,
  	default: 0
  },
  filename: {
  	type: String,
  	required: true
  },
  mimetype: {
  	type: String,
  	default: 'audio/mpeg'
  },
  downloads: {
  	type: Number,
  	default: 0
  },
  likes: {
  	type: Number,
  	default: 0
  }

})

module.exports = model('Audio', schema)
