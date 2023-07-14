const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema(
  {
    title: String,
    description: String,
    author: String,
    image: String,
    likeCount: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: new Date()
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Article', articleSchema)