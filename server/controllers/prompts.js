const readPrompts = require('../models/readPrompts');
const readPromptById = require('../models/readPromptById');
const updatePrompt = require('../models/updatePrompt');
const deletePrompt = require('../models/deletePrompt');
const createPrompt = require('../models/createPrompt');

const getPromptsController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const prompts = await readPrompts(userId);
        res.status(200).json({
            data: prompts,
            message: 'Prompts retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error retrieving prompts',
            data: null
        });
    }
}

const getPromptController = async (req, res) => {
    try {
        const promptId = req.params.id;
        const prompt = await readPromptById(promptId);
        res.status(200).json({
            data: prompt,
            message: 'Prompt retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error retrieving prompt',
            data: null
        });
    }
}

const updatePromptController = async (req, res) => {
    try {
        const promptId = req.params.id;
        const context = req.body.context;
        const additionalDetails = req.body.additionalDetails;
        const quality = req.body.quality;
        const prompt = req.body.prompt;
        const length = req.body.length;
        const templateId = req.body.templateId;
        const offerId = req.body.offerId;
        const businessId = req.body.businessId;
        const audience = req.body.audience;
        const updatedPrompt = await updatePrompt(promptId, context, additionalDetails, quality, prompt, length, templateId, offerId, businessId, audience);
        res.status(200).json({
            data: updatedPrompt,
            message: 'Prompt updated successfully'
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error updating prompt',
            data: null
        });
    }
}

const deletePromptController = async (req, res) => {
    try {
        const promptId = req.params.id;
        const prompt = await deletePrompt(promptId);
        res.status(200).json({
            data: prompt,
            message: 'Prompt deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting prompt',
            data: null
        });
    }
}

const createPromptController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const folderId = req.body.folderId;
        const prompt = await createPrompt(userId, Number(folderId));
        res.status(200).json({
            data: prompt,
            message: 'Prompt created successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error creating prompt',
            data: null
        });
    }
}

module.exports = {
    getPromptsController,
    getPromptController,
    updatePromptController,
    deletePromptController,
    createPromptController
}