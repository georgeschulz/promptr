const db = require('./db')

module.exports = getOffers = async (userId) => {
    const query = `
        SELECT * FROM offers
        WHERE user_id = $1
    `

    const offers = await db.query(query, [userId]);
    return offers.rows;
}