const router = require('express').Router();
const controllers = require('../controllers/templates');

router.get('/', controllers.getTemplatesController);
router.get('/:id', controllers.getTemplateController);
router.post('/', controllers.createTemplateController);
router.put('/:id', controllers.updateTemplateController);
router.delete('/:id', controllers.deleteTemplateController)

module.exports = router;