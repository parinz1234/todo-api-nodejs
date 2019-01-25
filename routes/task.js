import { Router } from 'express'
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
  .get('/', getAllTask)
  .post('/', createTask)
  .get('/:taskId', getTask)
  .put('/:taskId', updateTask)
  .delete('/:taskId', deleteTask)
  .put('/:taskId/status', setStatusTask)

export default taskRouter