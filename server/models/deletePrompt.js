const db = require('./db')

module.exports = deletePrompt = async (promptId) => {
    const query = `
        DELETE FROM prompts
        WHERE prompt_id = $1
        RETURNING *
    `

    const prompt = await db.query(query, [promptId]);
    return prompt.rows[0];
}