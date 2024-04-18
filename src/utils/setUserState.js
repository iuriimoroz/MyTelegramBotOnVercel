const { createClient } = require('@vercel/postgres');

async function setUserState(chatId, desiredPrice, notificationSent, currentAlertPrice) {
    // Connect to the PostgreSQL database
    const client = createClient();
    await client.connect();

    try {
        // Check if the user_state table exists
        const checkTableQuery = `SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_name = 'user_state'
        )`;
        const { rows } = await client.query(checkTableQuery);
        const tableExists = rows[0].exists;

        // If the user_state table doesn't exist, create it
        if (!tableExists) {
            const createTableQuery = `
                CREATE TABLE user_state (
                    chat_id TEXT PRIMARY KEY,
                    desired_price FLOAT,
                    notification_sent BOOLEAN,
                    current_alert_price FLOAT
                )
            `;
            await client.query(createTableQuery);
        }

        // Insert user state into the database
        const insertQuery = `
        INSERT INTO user_state (chat_id, desired_price, notification_sent, current_alert_price) 
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (chat_id) DO UPDATE 
        SET desired_price = EXCLUDED.desired_price, 
            notification_sent = EXCLUDED.notification_sent, 
            current_alert_price = EXCLUDED.current_alert_price
    `;

        await client.query(insertQuery, [chatId, desiredPrice, notificationSent, currentAlertPrice]);
    } catch (error) {
        console.error('Error setting user state:', error);
    } finally {
        // Disconnect from the database
        await client.end();
    }
}

module.exports = { setUserState };