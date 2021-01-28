const routes = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const router = routes.Router()

router.get('/', (req, res) => res.json({ route: 'root/'}))
router.post('/upload', multer(multerConfig).single('imageFile'), (req, res) => {
	console.log(req.file)
	
	return res.json({ multer: `configured`})
})

module.exports = router
