'use strict';

/**
 * Functions
 */

var SlackBot  = require('../lib').SlackBot;

/**
 * Incoming
 * - Process incoming SlashCommand
 */

module.exports.incoming = SlackBot.process;

/**
 * Authorize
 * - Handle authorization of the Slack App
 */

module.exports.authorize = SlackBot.authorize;