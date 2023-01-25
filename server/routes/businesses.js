const router = require('express').Router();
const controllers = require('../controllers/businesses');

router.get('/', controllers.getBusinessesController);
router.get('/:id', controllers.getBusinessController);
router.delete('/:id', controllers.deleteBusinessController);
router.post('/', controllers.createBusinessController);
router.put('/:id', controllers.updateBusinessController);

module.exports = router;