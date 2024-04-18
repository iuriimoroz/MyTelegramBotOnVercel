const TelegramBot = require('node-telegram-bot-api');
const { getBitcoinPrice } = require('../src/utils/getBitcoinPrice');
const { setUserState } = require('../src/utils/setUserState');
const { setPriceState } = require('../src/utils/setPriceState');
const { getPriceState } = require('../src/utils/getPriceState');

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
    try {
        const bot = new TelegramBot(process.env.TOKEN);
        // Retrieve the POST request body that gets sent from Telegram
        const { body } = request;

        // Ensure that this is a message being sent
        if (body.message) {
            // Retrieve the ID for this chat
            // and the text that the user sent
            const { chat: { id }, text } = body.message;

            if (text === '/start') {
                const welcomeMessage = `Welcome to the bot!\n\nYou can use the following commands:\n/getBitcoinPrice - Get the current Bitcoin price\n/setBitcoinPriceAlert - Set your desired Bitcoin price to get notification`;
                await bot.sendMessage(id, welcomeMessage);
            } else if (text === '/getBitcoinPrice') {
                try {
                    const bitcoinPrice = await getBitcoinPrice();
                    await bot.sendMessage(id, bitcoinPrice);
                } catch (error) {
                    console.error('Error:', error);
                    await bot.sendMessage(id, 'Failed to fetch Bitcoin price.');
                }
            } else if (text === '/setBitcoinPriceAlert') {
                // Set the state to indicate that the user is setting their desired price
                await setPriceState(id, true);
                await bot.sendMessage(id, 'Please enter your desired Bitcoin price:');
            } else if (!isNaN(parseFloat(text)) && (await getPriceState(id)) === true) {
                // Logic to handle user input when setting the desired price
                const desiredPrice = parseFloat(text);
                const currentAlertPrice = await getBitcoinPrice(); // Get the current Bitcoin price
                const notificationSent = false; // Initialize notification status for the user

                // Reset the state to indicate that the user is no longer setting their desired price
                await setPriceState(id, false);

                // Send message about setting the desired Bitcoin price
                await bot.sendMessage(id, `Your desired Bitcoin price has been set to ${desiredPrice}`);

                // Call function to handle further processing
                await setUserState(id, desiredPrice, notificationSent, currentAlertPrice);
            }
        }
    } catch (error) {
        // If there was an error sending our message then we 
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error.toString());
    }

    // Acknowledge the message with Telegram
    // by sending a 200 HTTP status code
    response.send('OK');
};
