import { validationResult } from 'express-validator/check'
import mongoose from 'mongoose'
import Task from '../models/task'

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
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        message: 'Invalid body',
        errors: errors.array()
      })
  }
  const response = await Task.findOne({
    _id: new mongoose.Types.ObjectId(req.params.taskId),
    deletedAt: null
  })

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
}

const createTask = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        message: 'Invalid body',
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

const updateTask = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        message: 'Invalid params or body',
        errors: errors.array()
      })
  }
  const response = await Task.findOneAndUpdate({
    _id: new mongoose.Types.ObjectId(req.params.taskId),
    deletedAt: null
  }, {
    subject: req.body.subject,
    detail: req.body.detail ? req.body.detail : '',
    updatedAt: new Date()
  }, {
    new: true
  })
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
}

const setStatusTask = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        message: 'Invalid parameter or body',
        errors: errors.array()
      })
  }
  const response = await Task.findOneAndUpdate({
    _id: new mongoose.Types.ObjectId(req.params.taskId),
    deletedAt: null
  }, {
    status: Number(req.body.status),
    updatedAt: new Date()
  }, {
    new: true
  })
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
}

const deleteTask = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        message: 'Invalid parameter',
        errors: errors.array()
      })
  }
  const response = await Task.findOneAndUpdate({
    _id: new mongoose.Types.ObjectId(req.params.taskId),
    deletedAt: null
  }, {
    updatedAt: new Date(),
    deletedAt: new Date()
  })
  if (response)
    return res
      .status(200)
      .json()
  return res
    .status(404)
    .json({
      message: 'Not found',
    })
}

export {
  getAllTask,
  getTask,
  createTask,
  updateTask,
  setStatusTask,
  deleteTask
}
