import express from 'express'
import mongoose from 'mongoose'

import taskRouter from './Routes/task'

const PORT = 3000
const app = express()

mongoose.connect(`mongodb://localhost:27017/test`, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, `MongoDB connection error`))

app.use(express.json())

app.use('/api/v1/tasks', taskRouter)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})