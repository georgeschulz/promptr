const readTemplates = require('../models/readTemplates');
const readTemplateById = require('../models/readTemplateById');
const createTemplate = require('../models/createTemplate');
const updateTemplate = require('../models/updateTemplate');

const getTemplatesController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const templates = await readTemplates(userId);
        res.status(200).json({
            data: templates,
            message: 'Templates retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error retrieving templates',
            data: null
        });
    }
}

const getTemplateController = async (req, res) => {
    try {
        const templateId = req.params.id;
        const template = await readTemplateById(templateId);
        res.status(200).json({
            data: template,
            message: 'Template retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error retrieving template',
            data: null
        });
    }
}

const createTemplateController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const template = await createTemplate(userId);
        res.status(200).json({
            data: template,
            message: 'Template created successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error creating template',
            data: null
        });
    }
}

const updateTemplateController = async (req, res) => {
    try {
        const templateId = req.params.id;
        const { name, template } = req.body;
        const templateReturned = await updateTemplate(templateId, name, template);
        res.status(200).json({
            data: templateReturned,
            message: 'Template updated successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error updating template',
            data: null
        });
    }
}

module.exports = {
    getTemplatesController,
    getTemplateController,
    createTemplateController,
    updateTemplateController
}