const db = require('./db')

module.exports = duplicatePrompt = async (promptId) => {
    const query = `
        INSERT INTO prompts (prompt, business_id, folder_id, quality, context, additional_details, length, prompt_name, template_id, offer_id, audience)
        SELECT prompt, business_id, folder_id, quality, context, additional_details, length, prompt_name, template_id, offer_id, audience
        FROM prompts
        WHERE prompt_id = $1
        RETURNING *
    `
    const prompt = await db.query(query, [promptId]);
    //update the prompt name to include the word "copy"
    const updateQuery = `
        UPDATE prompts
        SET prompt_name = CONCAT(prompt_name, ' copy')
        WHERE prompt_id = $1
        RETURNING *
    `

    const updatedPrompt = await db.query(updateQuery, [prompt.rows[0].prompt_id]);
    return updatedPrompt.rows[0];
}
