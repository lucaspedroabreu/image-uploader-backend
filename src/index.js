require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()
const port = 3000

// Database setup
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors()) // filters domains that can access the api (blank = unrestricted access, no cors = anyone blocked)
app.use(express.json()) // allows express to receive requests with json content
app.use(express.urlencoded({ extended: true })) // middleware that allow express to deal with encoded URLs
app.use(morgan('dev')) // middleware that logs requests and errors
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))) // authorize http access to local storage static files

app.use(require('./routes'))

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})