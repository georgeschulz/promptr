const getOffers = require('../models/getOffers');
const createOffer = require('../models/createOffer');
const readOfferById = require('../models/readOfferById');
const deleteOffer = require('../models/deleteOffer');
const updateOffer = require('../models/updateOffer');

const getOffersController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const offers = await getOffers(userId);
        res.status(200).json({
            data: offers,
            message: 'Offers retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error retrieving offers',
            data: null
        });
    }
}

const createOfferController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const offer = await createOffer(userId);
        res.status(200).json({
            data: offer,
            message: 'Offer created successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error creating offer',
            data: null
        });
    }
}

const readOfferByIdController = async (req, res) => {
    try {
        const offerId = req.params.id;
        const offer = await readOfferById(offerId);
        res.status(200).json({
            data: offer,
            message: 'Offer retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error retrieving offer',
            data: null
        });
    }
}

const deleteOfferController = async (req, res) => {
    try {
        const offerId = req.params.id;
        const deletedOffer = await deleteOffer(offerId);
        res.status(200).json({
            data: deletedOffer,
            message: 'Offer deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting offer',
            data: null
        });
    }
}

const updateOfferController = async (req, res) => {
    try {
        const offerId = req.params.id;
        const { painPoints, benefits, name, description, features } = req.body;
        const offer = await updateOffer(offerId, painPoints, benefits, name, description, features);
        res.status(200).json({
            data: offer,
            message: 'Offer updated successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error updating offer',
            data: null
        });
    }
}

module.exports = {
    getOffersController,
    createOfferController,
    readOfferByIdController,
    deleteOfferController,
    updateOfferController
};