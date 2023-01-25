const db = require('./db')

module.exports = readBusinesses = async (userId) => {
    try {
        const query = `
        SELECT * FROM businesses
        WHERE user_id = $1
    `

        const businesses = await db.query(query, [userId]);
        return businesses.rows;
    } catch (err) {
        console.log(err)
    }
}
