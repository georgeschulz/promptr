const db = require('./db')

module.exports = deleteOffer = async (offerId) => {
    const query = `
        DELETE FROM offers
        WHERE offer_id = $1
        RETURNING *`
    
    const offer = await db.query(query, [offerId]);
    return offer.rows[0];
}