const db = require('./db')

module.exports = updatePromptFolder = async (folderId, promptId) => {
    const query = `
        UPDATE prompts
        SET folder_id = $1
        WHERE prompt_id = $2
        RETURNING *
    `

    const updatedPrompt = await db.query(query, [folderId, promptId]);
    return updatedPrompt.rows[0];
}