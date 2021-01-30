// Post is a Entity Model for a specific Database (in this case mongodb)

const mongoose = require('mongoose')
const aws = require('aws-sdk')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')

const awsS3 = new aws.S3()

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

PostSchema.pre('save', function () {
	if (!this.imageURL) this.imageURL = `${process.env.APP_URL}/files/${this.uniqueFileName}`
})

PostSchema.pre('remove', function() {
	if (process.env.STORAGE_TYPE === 'awsS3storage') {
		return awsS3.deleteObject({
			Bucket: 'image-uploader-app-bucket',
			Key: this.uniqueFileName,
		}).promise()
	} else {
		return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.uniqueFileName))
	}
})

module.exports = mongoose.model('Post', PostSchema)