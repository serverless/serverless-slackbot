'use strict';

/**
 * Functions
 */

var path   = require('path'),
 SlackBot  = require('../_module').SlackBot;

// Load You SlackBot's Skills
SlackBot.loadSkills(path.join(__dirname, '../lib/skills'));

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