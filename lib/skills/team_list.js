/**
 * Test: Run
 */

var Slack = require('slack-node');

module.exports = function(SlackBot) {

  SlackBot.addSkill('team', 'list', function(event, context, body, bot) {

    var slack = new Slack(bot.access_token);
    slack.api("users.list", function(err, response) {
      
      return context.done(null, { text: 'Success!  Your team has listed!' });
    });
  });
};