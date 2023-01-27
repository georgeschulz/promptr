const db = require('./db');

module.exports = async (templateId) => {
    const query = 'DELETE FROM templates WHERE template_id = $1 RETURNING *';
    const { rows } = await db.query(query, [templateId]);
    return rows;
}