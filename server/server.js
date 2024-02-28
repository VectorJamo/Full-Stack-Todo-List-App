const fs = require('fs')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())

app.listen(3000, () => {
    console.log('Server is listening to requests on port 3000.')
})

const tasks = {task1:'Sample task 1', task2:'Sample task 2'}

app.get('/tasks', (req, res) => {
    res.json(tasks)
})
