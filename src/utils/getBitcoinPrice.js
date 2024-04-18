const axios = require('axios');

// Function to get Bitcoin price from CoinGecko API
async function getBitcoinPrice() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const price = response.data.bitcoin.usd;
        return price;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch Bitcoin price.');
    }
}

module.exports = { getBitcoinPrice };