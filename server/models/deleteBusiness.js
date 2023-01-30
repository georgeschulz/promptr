const db = require('./db')

module.exports = deleteBusiness = async (businessId) => {
    await db.query('DELETE FROM audiences WHERE business_id = $1', [businessId])

    const query = `
        DELETE FROM businesses
        WHERE business_id = $1
        RETURNING *
    `

    const business = await db.query(query, [businessId]);

    return business.rows[0];
}