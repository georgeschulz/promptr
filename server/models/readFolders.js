const db = require('./db')

module.exports = readFolders = async (userId) => {
    const folders = await db.query(`SELECT * FROM folders WHERE user_id = $1`, [userId]);
    return folders.rows;
}