const db = require('./db')

module.exports = readFolderById = async (folderId) => {
    const query = `
        SELECT * FROM folders
        LEFT JOIN prompts
        ON folders.folder_id = prompts.folder_id
        WHERE prompts.folder_id = $1
    `

    const folder = await db.query(query, [folderId]);
    return folder.rows;
}