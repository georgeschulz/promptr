const db = require('./db')

module.exports = readTemplateById = async (templateId) => {
    const query = `
        SELECT * FROM templates
        WHERE template_id = $1
    `

    const template = await db.query(query, [templateId]);
    return template.rows[0];
}