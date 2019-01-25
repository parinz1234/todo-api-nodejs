import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  subject: String,
  detail: String,
  status: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: Date
})

const Task = mongoose.model('Task', schema, 'tasks')

export default Task