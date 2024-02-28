const express = require('express')

const app = express()

app.listen(3000, () => {
    console.log('Server is listening to requests on port 3000.')
})