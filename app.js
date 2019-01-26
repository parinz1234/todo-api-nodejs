import express from 'express'
import mongoose from 'mongoose'
require('dotenv').config()

import taskRouter from './routes/task'

const app = express()

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE_NAME}`, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, `MongoDB connection error`))

app.use(express.json())

app
  .use('/api/v1/tasks', taskRouter)
  .all('*', (req, res) => res.status(501).json())

app.listen(process.env.DB_HOST, () => {
  console.log(`server running on port ${process.env.DB_HOST}`)
})