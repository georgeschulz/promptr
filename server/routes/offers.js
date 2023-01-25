const router = require('express').Router();
const controllers = require('../controllers/offers');

router.get('/', controllers.getOffersController);
router.post('/', controllers.createOfferController);
router.get('/:id', controllers.readOfferByIdController);
router.delete('/:id', controllers.deleteOfferController);
router.put('/:id', controllers.updateOfferController);

module.exports = router;