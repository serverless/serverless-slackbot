'use strict';

/**
 * Lib
 */

// Require SlackBot
var SlackBot = require('../_module').SlackBot;

// Load Skills
SlackBot.loadSkills('./skills');
console.log(SlackBot, SlackBot.skills);

/**
 * Incoming
 * - Handle incoming SlashCommand
 */

module.exports.incoming = SlackBot.process;

/**
 * Authorize
 * - Handle authorization of the Slack App
 */

module.exports.authorize = SlackBot.authorize;