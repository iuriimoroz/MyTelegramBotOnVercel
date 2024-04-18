
# Bitcoin Price Notification Bot

  

Bitcoin Price Notification Bot is a Telegram bot hosted on Vercel that provides users with real-time notifications about Bitcoin price movements. Users can set their desired price threshold, and the bot will send them a notification via Telegram when the Bitcoin price reaches or crosses that threshold. Additionally, users can also retrieve the current Bitcoin price directly from the bot.

  

## Table of Contents

  

- [Introduction](#introduction)

 - [Setup](#setup)

- [Features](#features)

- [Usage](#usage)

- [Contributing](#contributing)

- [License](#license)

  

## Introduction

  

Bitcoin Price Notification Bot is a Node.js application designed to provide users with real-time notifications about Bitcoin price movements. Users can set their desired price threshold, and the bot will send them a notification via Telegram when the Bitcoin price reaches or crosses that threshold. Additionally, users can also retrieve the current Bitcoin price directly from the bot.

## Setup

  

### 1. Clone the Repository

  

First, clone the repository to your local machine:

  

```bash

git  clone  https://github.com/your-username/your-repository.git`

```

### 2. Configure Environment Variables on Vercel

  

Since the bot will be hosted on Vercel, you'll need to configure your environment variables directly on the Vercel dashboard. These variables typically include:

  

-  `TOKEN`: Your Telegram bot token.

- Other necessary configuration variables for your bot, such as API keys or secrets.

  

To set up environment variables on Vercel, refer to their documentation: Vercel Environment Variables

  

### 3. Set Up the Database on Vercel

  

If you're using a PostgreSQL database hosted on Vercel, make sure to set it up according to their documentation: Vercel Databases

  

### 4. Deploy the Bot to Vercel

  

Once you've configured your environment variables and set up the database, deploy the bot to Vercel using their CLI or through their dashboard.

  

### 5. Verify Deployment

  

After deployment, make sure to verify that the bot is up and running by sending a message to it on Telegram.
  

## Troubleshooting

  

If you encounter any issues during setup or usage, refer to the troubleshooting section or reach out to the repository maintainers for assistance.

  

## Features

  

- Set your desired Bitcoin price threshold

- Receive notifications via Telegram when the Bitcoin price reaches or crosses your threshold

- Retrieve the current Bitcoin price directly from the bot

- Simple and easy-to-use interface

- Real-time updates using the CoinGecko API

  
  
  

## Usage

  

Once the bot is up and running, users can interact with it via Telegram:

  

- Use the `/start` command to begin interacting with the bot.

- Use the `/getBitcoinPrice` command to retrieve the current Bitcoin price.

- Use the `/setBitcoinPriceAlert` command to set your desired Bitcoin price threshold and receive notifications.

  

## Contributing

  

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

  

1. Fork the repository.

2. Create a new branch (`git checkout -b feature/improvement`).

3. Make your changes.

4. Commit your changes (`git commit -am 'Add new feature'`).

5. Push to the branch (`git push origin feature/improvement`).

6. Create a new Pull Request.

  

## License

  

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.