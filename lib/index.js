'use strict';

/**
 * Lib
 * - Configure your SlackBot here
 */

var path      = require('path'),
    SlackBot  = require('../_module').SlackBot;

// Load your skills & events
SlackBot.load(
    path.join(__dirname, '../lib/skills'),
    path.join(__dirname, '../lib/events'));

// Export
module.exports.SlackBot = SlackBot;