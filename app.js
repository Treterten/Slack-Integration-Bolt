const { App } = require("@slack/bolt");
const winston = require('winston');
require('dotenv').config();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ format: winston.format.simple()})
    ],
});

(async () => {
    await app.start(process.env.PORT || 3000);
    try {
        await app.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: process.env.CHANNEL_ID || '',
            message: "Hello World",
        });
        logger.info("Message sent.");
    }
    catch (error) {
        logger.error(error);
    }
    console.log("⚡️ Bolt app is running!");
})();


