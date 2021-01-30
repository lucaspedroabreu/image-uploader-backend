const routes = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')
const Post = require('./models/Post')

const router = routes.Router()

// GET
router.get('/', (req, res) => res.json({ route: 'root/'}))
router.get('/images', async (req, res) => {
	const postedImages = await Post.find()
	
	return res.json(postedImages)
})

// POST
router.post('/images', multer(multerConfig).single('imageFile'), async (req, res) => {
	const { originalname: imageName, size: imageSize, uniqueFileName, location: imageURL = '' } = req.file
	
	const databasePost = await Post.create({
		imageName,
		imageSize,
		uniqueFileName,
		imageURL,
	})
	
	return res.json(databasePost)
})

// DELETE
router.delete('/images/:id', async (req, res) => {
	const queryImage = await Post.findById(req.params.id)
	
	await queryImage.remove()
	
	return res.send()
})

module.exports = router
