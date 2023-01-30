const db = require('./db')

module.exports = createPrompt = async (userId, folderId) => {
    //get the Drafts folder
    const drafts = await db.query(`SELECT * FROM folders WHERE user_id = $1 AND folder_id = $2`, [userId, folderId]);
    const draftsId = drafts.rows[0].folder_id;
    console.log(draftsId)

    const query = `
        INSERT INTO prompts (quality, folder_id, prompt_name)
        VALUES (false, $1, 'New Prompt')
        RETURNING *
    `

    const prompt = await db.query(query, [draftsId]);
    return prompt.rows[0];
}

