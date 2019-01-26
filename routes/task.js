import { Router } from 'express'
import { body, param } from 'express-validator/check'
import {
  getAllTask,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  setStatusTask
} from '../controllers/taskController'

const taskRouter = Router()

taskRouter
  .route('/')
    .get(getAllTask)
    .post([
        body('subject')
          .exists().withMessage('subject is required')
          .isString().withMessage('subject must be string'),
        body('detail')
          .optional()
          .isString()
          .withMessage('detail must be string')
      ], createTask)
    .all((req, res) => res.status(405).json())
taskRouter
  .route('/:taskId')
    .get([
        param('taskId').isMongoId().withMessage('taskId is invalid')
      ], getTask)
    .put([
        param('taskId').isMongoId().withMessage('taskId is invalid'),
        body('subject')
          .exists().withMessage('subject is required')
          .isString().withMessage('subject must be string'),
        body('detail')
          .optional()
          .isString()
          .withMessage('detail must be string')
      ], updateTask)
    .delete([
        param('taskId').isMongoId().withMessage('taskId is invalid')
      ],deleteTask)
    .all((req, res) => res.status(405).json())
taskRouter
  .route('/:taskId/status')
    .put([
      param('taskId').isMongoId().withMessage('taskId is invalid'),
      body('status')
        .exists().withMessage('status is required')
        .isIn([0, 1]).withMessage('status is invalid')
    ],
    setStatusTask)
  .all((req, res) => res.status(405).json())
taskRouter
  .all('*', (req, res) => res.status(501).json())
export default taskRouter