const db = require('./db')

module.exports = updatePrompt = async (promptId, context, additionalDetails, quality, prompt, length) => {
    const query = `
        UPDATE prompts
        SET context = $1, additional_details = $2, quality = $3, prompt = $4, length = $5
        WHERE prompt_id = $6
        RETURNING *
    `

    const updatedPrompt = await db.query(query, [context, additionalDetails, quality, prompt, length, promptId]);
    return updatedPrompt.rows[0];
}

