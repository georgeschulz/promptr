const db = require('./db')

module.exports = readPromptById = async (promptId) => {
    const query = `
        SELECT * FROM prompts
        WHERE prompt_id = $1
    `

    const prompt = await db.query(query, [promptId]);
    return prompt.rows;
}
