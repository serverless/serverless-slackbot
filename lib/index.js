'use strict';

/**
 * Lib
 */

// Require SlackBot
var SlackBot = require('../_module').SlackBot;

// Load Skills
SlackBot.loadSkills('./skills');

/**
 * Incoming
 * - Handle incoming SlashCommand
 */

module.exports.incoming = function(event, context) {


};

/**
 * Authorize
 * - Handle authorization of the Slack App
 */

module.exports.authorize = function(event, context) {


};