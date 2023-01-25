const db = require('./db')

module.exports = readOfferById = async (offerId) => {
    const query = `
        SELECT * FROM offers
        WHERE offer_id = $1
    `
    
    const offer = await db.query(query, [offerId]);
    return offer.rows[0];
}