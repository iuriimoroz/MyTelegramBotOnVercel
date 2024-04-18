const { createClient } = require('@vercel/postgres');

async function getPriceState(chatId) {
    // Connect to the PostgreSQL database
    const client = createClient();
    await client.connect();

    try {
        // Check if the user_price_state table exists
        const checkTableQuery = `
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'user_price_state'
            )
        `;
        const { rows } = await client.query(checkTableQuery);
        const tableExists = rows[0].exists;

        // If the user_price_state table doesn't exist or no entry for chatId, return null
        if (!tableExists) {
            return null;
        }

        // Retrieve the current price state from the database
        const selectQuery = `
            SELECT current_price_state
            FROM user_price_state
            WHERE chat_id = $1
        `;
        const result = await client.query(selectQuery, [chatId]);

        // If there's no result, return null
        if (result.rows.length === 0) {
            return null;
        }

        // Extract and return the current price state
        return result.rows[0].current_price_state;
    } catch (error) {
        console.error('Error getting price state:', error);
        return null;
    } finally {
        // Disconnect from the database
        await client.end();
    }
}

module.exports = { getPriceState };
