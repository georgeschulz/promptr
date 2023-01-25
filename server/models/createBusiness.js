const db = require('./db')

module.exports = createBusiness = async (userId) => {
    const query = `
        INSERT INTO businesses (user_id)
        VALUES ($1)
        RETURNING *`

    const business = await db.query(query, [userId]);
    return business.rows[0];
}
