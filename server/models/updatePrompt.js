const db = require('./db')

module.exports = updatePrompt = async (promptId, context, additionalDetails, quality, prompt, length, templateId, offerId, businessId, audience) => {
    const query = `
        UPDATE prompts
        SET context = $1, additional_details = $2, quality = $3, prompt = $4, length = $5, template_id = $7, offer_id = $8, business_id = $9, audience = $10
        WHERE prompt_id = $6
        RETURNING *
    `

    const updatedPrompt = await db.query(query, [context, additionalDetails, quality, prompt, length, promptId, templateId, offerId, businessId, audience]);
    return updatedPrompt.rows[0];
}

