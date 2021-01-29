const multer = require('multer')
const multerS3 = require('multer-s3') // multer-s3 is an extension to multer that serves files to AWS S3
const path = require('path') // guarantees correct path between different OS
const crypto = require('crypto') // lib used to hash files, passwords, et cetera
const aws = require('aws-sdk')

const localPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')
const awsS3storage = new aws.S3({
	accessKeyId: 'AKIARQIN2EFUGZR5VXOS',
	secretAccessKey,
})

module.exports = {
	dest: localPath, // redundancy for storage: >> multer.diskStorage >> destination: >> callback
	storage: multer.diskStorage({
		destination: (request, file, callback) => callback(null, localPath),
		filename: (request, file, callback) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) callback(err)
				
				const fileName = `${hash.toString('hex')}-${file.originalname}`
				callback(null, fileName)
			})
		},
	}),
	limites: {
		fileSize: 2 * 1024 * 1024,
	},
	fileFilter: (request, file, callback) => {
		const allowedMimes = [
			'image/jpeg',
			'image/jpg',
			'image/png',
			'image/gif',
		]
		
		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true)
		} else {
			callback(new Error('Invalid file type!\nExtensions allowed: JPEG, JPG, PNG, GIF'))
		}
	}
}


// multer configuration file

/**
 * LEARNING COMMENT
 * multer is a middleware and as such
 * it will intercept route calls with its method.
 * With separation of concern in mind,
 * we inject its parameters in another file (this)
 * and then require this file on routes file
 * 
 * multer-s3 is a multer extension to serve files to AWS S3 servers
 * 
 * AWS SDK is the library that allows to connect to AWS Servers
 */