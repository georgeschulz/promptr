const db = require('./db')

module.exports = updatePrompt = async (promptId, context, additionalDetails, quality, prompt, length, templateId, offerId, businessId, audience, promptName) => {
    const query = `
        UPDATE prompts
        SET context = $1, additional_details = $2, quality = $3, prompt = $4, length = $5, template_id = $7, offer_id = $8, business_id = $9, audience = $10, prompt_name = $11
        WHERE prompt_id = $6
        RETURNING *
    `

    const updatedPrompt = await db.query(query, [context, additionalDetails, quality, prompt, length, promptId, templateId, offerId, businessId, audience, promptName]);
    return updatedPrompt.rows[0];
}

