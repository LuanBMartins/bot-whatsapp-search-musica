
const { WebhookController } = require('@zenvia/sdk');
const options = require('./service')


const webhook = new WebhookController(options);

webhook.on('listening', () => {
  console.info('Webhook is listening');
});

webhook.init();

