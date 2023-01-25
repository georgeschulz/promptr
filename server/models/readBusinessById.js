const db = require('./db')

module.exports = readBusinessById = async (businessId) => {
    const query = `
        SELECT * FROM businesses
        WHERE business_id = $1
    `

    const business = await db.query(query, [businessId]);
    return business.rows[0];
}
