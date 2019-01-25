import Task from '../models/task'
import { body, validationResult } from 'express-validator/check'

const getAllTask = async (req, res) => {
  const response = await Task.find({
    deletedAt: null
  }, {
    subject: 1,
    detail: 1,
    status: 1
  })
  return res
    .status(200)
    .json(response);
}

const getTask = async (req, res) => {
  try {
    const response = await Task.findById(req.params.taskId)
    if (response)
      return res
        .status(200)
        .json({
          id: response._id,
          subject: response.subject,
          detail: response.detail,
          status: response.status
        })
    return res
      .status(404)
      .json({
        message: 'Not found',
      })
  } catch (e) {
    return res
      .status(415)
      .json({
        message: e.message
      })
  }
  
}

const createTask = [
  [
    body('subject').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({
          message: 'Invalid params',
          errors: errors.array()
        })
    }

    const newTask = new Task({
      subject: req.body.subject,
      detail: req.body.detail ? req.body.detail : ''
    })

    const response = await newTask.save();
    return res
      .status(201)
      .json({
        id: response._id,
        subject: response.subject,
        detail: response.detail,
        status: response.status
      })
  }
]

const updateTask = (req, res) => {

}

const setStatusTask = (req, res) => {
  
}

const deleteTask = (req, res) => {

}

export {
  getAllTask,
  getTask,
  createTask,
  updateTask,
  setStatusTask,
  deleteTask
}
