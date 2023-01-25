const router = require('express').Router();
const controllers = require('../controllers/businesses');

router.get('/', controllers.getBusinessesController);

module.exports = router;