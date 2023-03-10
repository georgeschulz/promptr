const readFolders = require('../models/readFolders');
const readFolderById = require('../models/readFolderById');
const createFolder = require('../models/createFolder');
const deleteFolder = require('../models/deleteFolder');
const updatePromptFolder = require('../models/updatePromptFolder');
const updateFolderName = require('../models/updateFolderName');

const getFoldersController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const folders = await readFolders(userId);
        res.status(200).json({
            data: folders,
            message: 'Folders retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error retrieving folders',
            data: null
        });
    }
}

const getFolderController = async (req, res) => {
    try {
        const folderId = req.params.id;
        const folder = await readFolderById(folderId);
        res.status(200).json({
            data: folder,
            message: 'Folder retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error retrieving folder',
            data: null
        });
    }
}

const createFolderController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const name = req.body.name;
        const folder = await createFolder(userId, name);
        res.status(200).json({
            data: folder,
            message: 'Folder created successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error creating folder',
            data: null
        });
    }
}

const deleteFolderController = async (req, res) => {
    try {
        const folderId = req.params.id;
        const folder = await deleteFolder(folderId);
        res.status(200).json({
            data: folder,
            message: 'Folder deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting folder',
            data: null
        });
    }
}

const updatePromptFolderController = async (req, res) => {
    try {
        const promptId = req.params.id;
        const folderId = req.body.folderId;
        console.table({folderId, promptId})
        const updatedPrompt = await updatePromptFolder(folderId, promptId);
        res.status(200).json({
            data: updatedPrompt,
            message: 'Prompt updated successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error updating prompt',
            data: null
        });
    }
}

const updateFolderNameController = async (req, res) => {
    try {
        const folderId = req.params.id;
        const folderName = req.body.folderName;
        const updatedFolder = await updateFolderName(folderId, folderName);
        res.status(200).json({
            data: updatedFolder,
            message: 'Folder updated successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error updating folder',
            data: null
        });
    }
}

module.exports = {
    getFoldersController,
    getFolderController,
    createFolderController,
    deleteFolderController,
    updatePromptFolderController,
    updateFolderNameController
}