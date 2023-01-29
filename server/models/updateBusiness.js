const db = require('./db')

module.exports = updateBusiness = async (businessId, name, description, audiences) => {
    console.log(audiences)
    const query = `
        UPDATE businesses
        SET description = $1, name = $2
        WHERE business_id = $3
        RETURNING *
    `
    //delete all audiences for this business
    await db.query(`DELETE FROM audiences WHERE business_id = $1`, [businessId]);
    const business = await db.query(query, [description, name, businessId]);
    //add all audiences for this business
    const audiencesQuery = `
        INSERT INTO audiences (name, business_id)
        VALUES ($1, $2)
        RETURNING *
    `
    for (let i = 0; i < audiences.length; i++) {
        await db.query(audiencesQuery, [audiences[i], businessId]);
    }
    return business.rows[0];

}