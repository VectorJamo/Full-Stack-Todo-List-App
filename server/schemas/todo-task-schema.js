const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    }
}, {timestamps: true})

const taskModel = mongoose.model('todo-task', taskSchema)
module.exports = taskModel