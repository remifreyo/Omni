const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    comment: String
  },
  {
    timestamps: true
  }
)

const articleSchema = new Schema(
  {
    title: String,
    description: String,
    author: String,
    image: String,
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category'
      }
    ],
    comments: [commentSchema],
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
