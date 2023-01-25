const db = require('./db')

module.exports = updateBusiness = async (businessId, name, description) => {
    const query = `
        UPDATE businesses
        SET description = $1, name = $2
        WHERE business_id = $3
        RETURNING *
    `

    const business = await db.query(query, [description, name, businessId]);
    return business.rows[0];

}