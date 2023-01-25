const db = require('./db')

module.exports = createPrompt = async (userId) => {
    //get the Drafts folder
    const drafts = await db.query(`SELECT * FROM folders WHERE user_id = $1 AND name = 'Drafts'`, [userId]);
    const draftsId = drafts.rows[0].folder_id;
    console.log(draftsId)

    const query = `
        INSERT INTO prompts (quality, folder_id)
        VALUES (false, $1)
        RETURNING *
    `

    const prompt = await db.query(query, [draftsId]);
    return prompt.rows[0];
}

