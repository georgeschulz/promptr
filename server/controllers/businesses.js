const readBusinesses = require('../models/readBusinesses');

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

module.exports = {
    getBusinessesController
};