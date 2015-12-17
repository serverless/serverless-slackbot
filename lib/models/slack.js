'use strict';

var SlackSDK = require('slack-node'),
    Team     = require('./team');

/**
 * Slack
 * @constructor
 */

var Slack = {};

/**
 * Send Incoming Webhook
 * - Sends a message into Slack
 */

Slack.sendIncomingWebhook = function(accessToken, options, cb) {
    var slackSdk = new SlackSDK(accessToken);
    slackSdk.setWebhook(options.webhookUri);
    return slackSdk.webhook(options, cb);
};

module.exports = Slack;