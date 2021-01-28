const express = require('express')
const morgan = require('morgan')

const app = express()
const port = 3000

app.use(express.json()) // allows express to receive requests with json content
app.use(express.urlencoded({ extended: true })) // middleware that allow express to deal with encoded URLs
app.use(morgan('dev')) // middleware that logs requests and errors

app.use(require('./routes'))

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})