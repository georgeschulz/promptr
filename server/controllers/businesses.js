const readBusinesses = require('../models/readBusinesses');
const readBusinessById = require('../models/readBusinessById');
const deleteBusiness = require('../models/deleteBusiness');
const createBusiness = require('../models/createBusiness');
const updateBusiness = require('../models/updateBusiness');


const getBusinessesController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const businesses = await readBusinesses(userId);
        res.status(200).json({
            data: businesses,
            message: 'Businesses retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error retrieving businesses',
            data: null
        });
    }
}

const getBusinessController = async (req, res) => {
    try {
        const businessId = req.params.id;
        const business = await readBusinessById(businessId);
        res.status(200).json({
            data: business,
            message: 'Business retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error retrieving business',
            data: null
        });
    }
}

const deleteBusinessController = async (req, res) => {
    try {
        const businessId = req.params.id;
        const deletedBusiness = await deleteBusiness(businessId);
        res.status(200).json({
            data: deletedBusiness,
            message: 'Business deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting business',
            data: null
        });
    }
}

const createBusinessController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const business = await createBusiness(userId);
        res.status(200).json({
            data: business,
            message: 'Business created successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error creating business',
            data: null
        });
    }
}

const updateBusinessController = async (req, res) => {
    try {
        const businessId = req.params.id;
        const description = req.body.description;
        const name = req.body.name;
        const updatedBusiness = await updateBusiness(businessId, name, description);
        res.status(200).json({
            data: updatedBusiness,
            message: 'Business updated successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error updating business',
            data: null
        });
    }
}

module.exports = {
    getBusinessesController,
    getBusinessController,
    deleteBusinessController,
    createBusinessController,
    updateBusinessController
};