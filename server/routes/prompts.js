const router = require('express').Router();
const controllers = require('../controllers/prompts');

router.get('/', controllers.getPromptsController);
router.get('/:id', controllers.getPromptController);
router.put('/:id', controllers.updatePromptController);
router.delete('/:id', controllers.deletePromptController);
router.post('/', controllers.createPromptController);
router.post('/duplicate/:id', controllers.duplicatePromptController);

module.exports = router;