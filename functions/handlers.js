'use strict';

/**
 * Functions
 */

// Require Logic
var service = require('../lib');

// Authorize
module.exports.authorize = service.authorization.authorize;

// Receive Webhook
module.exports.receiveWebhook = service.webhooks.receive;

// Receive SlashCommand
module.exports.receiveSlashcommand = service.slashcommands.receive;