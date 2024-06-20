const mongoose = require('mongoose')

const schema = {
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
}

module.exports = mongoose.model('User', schema)
