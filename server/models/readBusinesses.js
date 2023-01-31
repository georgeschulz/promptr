const db = require('./db')

module.exports = readBusinesses = async (userId) => {
    try {
        const query = `
        SELECT
            businesses.business_id,
            businesses.user_id,
            businesses.description,
            businesses.name,
            audiences.audience_id,
            audiences.name as audience_name
        FROM businesses
        LEFT JOIN audiences
        ON businesses.business_id = audiences.business_id
        WHERE businesses.user_id = $1
    `

        const businesses = await db.query(query, [userId]);
        // create an object to hold the unique businesses
        const businessesWithAudiences = {};
        // loop through the businesses
        businesses.rows.forEach(business => {
            // if the business is not in the businessesWithAudiences object
            if (!businessesWithAudiences[business.business_id]) {
                // add the business to the businessesWithAudiences object
                businessesWithAudiences[business.business_id] = {
                    business_id: business.business_id,
                    user_id: business.user_id,
                    description: business.description,
                    name: business.name,
                    audiences: []
                }
            }
            // if the business is in the businessesWithAudiences object
            if (businessesWithAudiences[business.business_id]) {
                // if the business has an audience
                if (business.audience_id) {
                    // add the audience to the business
                    businessesWithAudiences[business.business_id].audiences.push({
                        audience_id: business.audience_id,
                        name: business.audience_name
                    })
                }
            }
        })

        // convert the object to an array
        const businessesWithAudiencesArray = Object.values(businessesWithAudiences);
        return businessesWithAudiencesArray;
    } catch (err) {
        console.log(err)
    }
}
