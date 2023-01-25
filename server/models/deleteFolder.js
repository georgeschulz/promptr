const db = require('./db')

module.exports = deleteFolder = async (folderId) => {
    const query = `
        DELETE FROM folders
        WHERE folder_id = $1
    `

    const folder = await db.query(query, [folderId]);
    return folder.rows;
}
