const db = require('./db')

module.exports = deleteBusiness = async (businessId) => {
    const query = `
        DELETE FROM businesses
        WHERE business_id = $1
        RETURNING *
    `

    const business = await db.query(query, [businessId]);

    return business.rows[0];
}