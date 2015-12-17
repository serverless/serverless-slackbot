'use strict';

/**
 * Controller: SlashCommands
 * - event.body will contain these properties from an incoming SlashCommand:
 * - token, team_id, team_domain, channel_id, channel_name, user_id, user_name, command, text, response_url
 */

var qs       = require('qs'),
    Team     = require('../models/team'),
    Slack    = require('slack-node');

module.exports.receive = function(event, context) {

  // Make sure the POST request came from Slack using the event token
  //if (event.token != process.env.SLASH_EVENT_TOKEN) return context.done('Access Denied');

  // Parse Body
  var body     = qs.parse(event.body);
  body.command = body.command.substring(1, body.command.length); // Strip slash

  // Route
  if (commandRouter[body.command]) var response = commandRouter[body.command](body);
  else var response = { text: 'Hi, this is my default response because I don\'t know what you mean!' };

  return context.done(null, response);
};

/**
 * Command Router
 */

var commandRouter = {};

/**
 * Command: weather
 * - Normal SlashCommand functionality
 * - Make sure you register this command in your Slack App
 **/

commandRouter.weather = function(body) {

  // Look up the weather
  return { text: 'The weather in blah, blah is really good!' };
};

/**
 * Command: Chat
 * - Here, we recreate chat functionality via a single "chat" SlashCommand.
 * - You might want to rename this command to something less general.
 * - If you are designing a chat bot that runs via slash command, consider giving it the single slash command of its name.
 */

commandRouter.chat = function(body) {

  // Hello
  if (body.text.indexOf('hello') !== -1) return { text: 'Hi, ' + body.user_name + '.  You\'re looking good!' };

  // How are you
  if (body.text.indexOf('how are you') !== -1) return { text: 'I\'m doing well, thanks.  And you?' };

  // My team
  if (body.text.indexOf('my team') !== -1) {

    var team = new Team();
    return team.show(body.team_id, function(error, team) {
      console.log(error, team);
      if (error) console.log("Team lookup error: ", error);

      // Instantiate Slack API
      var slack = new Slack(team.access_token);
      slack.api("users.list", function(error, response) {

        if (error) console.log("Slack API error: ", error, response);

        return { text: 'Users listed, check logs' };
      });
    });
  }

  return { text: 'Sorry, I\'m not sure what you mean...' };
};