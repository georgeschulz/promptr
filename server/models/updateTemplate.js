const db = require('./db')

module.exports = updateTemplate = async (templateId, name, template) => {
    const query = `
        UPDATE templates
        SET name = $1, template = $2
        WHERE template_id = $3
        RETURNING *
    `
    const updatedTemplate = await db.query(query, [name, template, templateId]);
    return updatedTemplate.rows[0];
}
