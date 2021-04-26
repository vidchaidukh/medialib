const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    default: "Undefined"
  },
  artist: {
    type: String,
    default: "Undefined"
  },
  size: {
  	type: Integer,
  	default: 0
  },
  filename: {
  	type: String,
  	required: true
  },
  mimetype: {
  	type: String,
  	default: 'audio/mpeg'
  }
})

module.exports = model('Audio', schema)
