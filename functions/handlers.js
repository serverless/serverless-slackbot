'use strict';

/**
 * Functions
 */

var path = require('path');

// Require SlackBot
var SlackBot = require('../_module').SlackBot;

// Load Skills
SlackBot.loadSkills(path.join(__dirname, '../lib/skills'));

/**
 * Incoming
 * - Process incoming SlashCommand
 */

module.exports.incoming = function(event, context) {
  console.log("HERHERHER", event, context)
  //return SlackBot.process(event, context);
};

/**
 * Authorize
 * - Handle authorization of the Slack App
 */

module.exports.authorize = function(event, context) {
  return SlackBot.authorize(event, context);
};