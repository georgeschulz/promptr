const db = require('./db')

module.exports = updateFolderName = async (folderId, folderName) => {
    const query = `
        UPDATE folders
        SET name = $1
        WHERE folder_id = $2
        RETURNING *
    `

    const folder = await db.query(query, [folderName, folderId]);
    return folder.rows[0];
}