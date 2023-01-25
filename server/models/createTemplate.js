const db = require('./db')

module.exports = createTemplate = async (userId) => {
    const query = `
        INSERT INTO templates (user_id)
        VALUES ($1)
        RETURNING *`
    const template = await db.query(query, [userId]);
    return template.rows[0];
}