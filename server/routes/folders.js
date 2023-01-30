const router = require('express').Router();
const controllers = require('../controllers/folders');

router.get('/', controllers.getFoldersController);
router.get('/:id', controllers.getFolderController);
router.post('/', controllers.createFolderController);
router.delete('/:id', controllers.deleteFolderController);
router.put('/location/:id', controllers.updatePromptFolderController);
router.put('/:id', controllers.updateFolderNameController);

module.exports = router;