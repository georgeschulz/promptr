const db = require('./db')

module.exports = readTemplates = async (userId) => {
    const query = `
        SELECT * FROM templates
    `

    const templates = await db.query(query);
    return templates.rows;
}
