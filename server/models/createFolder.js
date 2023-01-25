const db = require('./db')

module.exports = createFolder = async (userId, name) => {
    const query = `
        INSERT INTO folders (user_id, name)
        VALUES ($1, $2)
        RETURNING *
    `

    const folder = await db.query(query, [userId, name]);
    return folder.rows[0];
}
