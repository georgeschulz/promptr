const db = require('./db')

module.exports = readPrompts = async (userId) => {
    const query = `
    SELECT 
        folders.folder_id,
        folders.name,
        prompts.prompt_name,
        prompts.prompt_id,
        prompts.context,
        prompts.additional_details,
        prompts.quality,
        prompts.prompt,
        prompts.length
    FROM users
    LEFT JOIN folders
      ON folders.user_id = users.user_id
    LEFT JOIN prompts
      ON prompts.folder_id = folders.folder_id
    WHERE users.user_id = $1 AND prompt_id IS NOT NULL;
    `
    const prompts = await db.query(query, [userId]);
    return prompts.rows;
}