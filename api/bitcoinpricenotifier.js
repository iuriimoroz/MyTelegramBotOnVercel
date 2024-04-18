const axios = require('axios');
const { getUserState } = require('../src/utils/getUserState');
const { setUserState } = require('../src/utils/setUserState');

// Function to fetch Bitcoin price and send notifications
module.exports = async (request, response) => {
    try {
        // Get user state from the database
        const userState = await getUserState();

        // Get updated Bitcoin price
        const axiosResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const updatedPrice = axiosResponse.data.bitcoin.usd;

        // Iterate over each user state
        for (const { chat_id, desired_price, current_alert_price, notification_sent } of userState) {
            if (!notification_sent) {
                let message = '';
                if (current_alert_price < desired_price && updatedPrice >= desired_price) {
                    message = `Bitcoin price has reached or exceeded your desired price of ${desired_price}`;
                } else if (current_alert_price > desired_price && updatedPrice <= desired_price) {
                    message = `Bitcoin price has fallen below your desired price of ${desired_price}`;
                } else if (current_alert_price === desired_price && updatedPrice > desired_price) {
                    message = `Bitcoin price has reached or exceeded your desired price of ${desired_price}`;
                } else if (current_alert_price === desired_price && updatedPrice < desired_price) {
                    message = `Bitcoin price has fallen below your desired price of ${desired_price}`;
                }

                if (message) {
                    // Send notification to the user
                    await axios.post(`https://api.telegram.org/${process.env.BOTID}/sendMessage`, {
                        chat_id: chat_id,
                        text: message
                    });

                    // Update notification_sent field in the database
                    await setUserState(chat_id, desired_price, true, current_alert_price);
                }
            }
        }

        // Respond with a success message
        response.status(200).send('Bitcoin price notifications sent successfully.');
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        response.status(500).send('Failed to fetch Bitcoin price.');
    }
};