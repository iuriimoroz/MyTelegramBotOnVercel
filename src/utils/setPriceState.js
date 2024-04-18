const { createClient } = require('@vercel/postgres');

async function setPriceState(chatId, currentPriceState) {
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

        // If the user_price_state table doesn't exist, create it
        if (!tableExists) {
            const createTableQuery = `
                CREATE TABLE user_price_state (
                    chat_id TEXT PRIMARY KEY,
                    current_price_state BOOLEAN
                )
            `;
            await client.query(createTableQuery);
        }

        // Insert or update user price state into the database
        const insertQuery = `
            INSERT INTO user_price_state (chat_id, current_price_state) 
            VALUES ($1, $2)
            ON CONFLICT (chat_id) DO UPDATE 
            SET current_price_state = EXCLUDED.current_price_state
        `;

        await client.query(insertQuery, [chatId, currentPriceState]);
    } catch (error) {
        console.error('Error setting price state:', error);
    } finally {
        // Disconnect from the database
        await client.end();
    }
}

module.exports = { setPriceState };
