const db = require('./db')

module.exports = readTemplates = async (userId) => {
    const query = `
        SELECT * FROM templates
        WHERE user_id = $1
    `

    const templates = await db.query(query, [userId]);
    return templates.rows;
}
