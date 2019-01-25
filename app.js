import express from 'express'

const PORT = 3000
const app = express()

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'hello world.'
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})