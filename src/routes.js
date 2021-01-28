const routes = require('express')
const router = routes.Router()

router.get('/', (req, res) => res.json({ route: 'root/'}))

module.exports = router

