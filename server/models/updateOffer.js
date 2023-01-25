const db = require('./db')

module.exports = updateOffer = async (offerId, painPoints, benefits, name, description, features) => {
    const query = `
        UPDATE offers
        SET pain_points = $1, benefits = $2, name = $3, description = $4, features = $5
        WHERE offer_id = $6
        RETURNING *
    `
    const offer = await db.query(query, [painPoints, benefits, name, description, features, offerId]);
    return offer.rows[0];
}