// Post is a Entity Model for a specific Database (in this case mongodb)

const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
	imageName: String,
	imageSize: Number,
	uniqueFileName: String,
	imageURL: String,
	createdAt: {
		type: Date,
		default: Date.now,
	}
})

module.exports = mongoose.model('Post', PostSchema)