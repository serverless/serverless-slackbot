'use strict';

// Load Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

/**
 * SlackBot
 */

module.exports.SlackBot = require('./slackbot/models/slackbot.js');