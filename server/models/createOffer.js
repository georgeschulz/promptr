const db = require('./db')

module.exports = createOffer = async (userId) => {
    const query = `
        INSERT INTO offers (user_id)
        VALUES ($1)
        RETURNING *`
    const offer = await db.query(query, [userId]);
    return offer.rows[0];
}

