const fs = require('fs')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const taskModel = require('./schemas/todo-task-schema')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.text())

fs.readFile('dbURI.txt', 'utf8', (err, data) => {
    mongoose.connect(data)
        .then(result => {
            console.log('Connected to the database!')

            app.listen(3000, () => {
                console.log('Server is listening to requests on port 3000.')
            })
        })
        .catch(error => {
            console.log(error)
        })
})

app.get('/tasks', (req, res) => {
    taskModel.find()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            console.log(error)
        })
})

app.post('/addTask', (req, res) => {
    // Send the task to the database
    taskModel.create({task: req.body})
        .then(document => {
            document.save()
            console.log('Task added to the database!')
        })
        .catch(error => {
            console.log(error)
        })

    res.status(200).send('Success!')
})

app.post('/removeTask', (req, res) => {
    // Remove the task from the database
    console.log(`Task to remove: ${req.body}`)
    taskModel.deleteOne({task: req.body})
        .then(result => {
            console.log('Task removed from the database!')
        })
        .catch(error => {
            console.log(error)
        })
} )
