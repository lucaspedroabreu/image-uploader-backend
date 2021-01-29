const routes = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')
const Post = require('./models/Post')

const router = routes.Router()

router.get('/', (req, res) => res.json({ route: 'root/'}))
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

module.exports = router
