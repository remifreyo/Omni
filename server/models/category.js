const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema(
  {
    category: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Category', categorySchema)
