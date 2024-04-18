const { createClient } = require('@vercel/postgres');

// Function to retrieve user state from the database
async function getUserState() {
    const client = createClient();
    await client.connect();

    try {
        const query = `
            SELECT chat_id, desired_price, current_alert_price, notification_sent
            FROM user_state
        `;
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching user state:', error);
        throw error;
    } finally {
        await client.end();
    }
}

module.exports = { getUserState };