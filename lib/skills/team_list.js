/**
 * Test: Run
 */

var Slack = require('slack-node');

module.exports = function(SlackBot) {

  SlackBot.addSkill('team', 'list', function(event, context, body, slackTeam) {

    // The Slack API is pre-configured, just make sure you have the correct scope!
    SlackBot.Slack.api('users.list', function(error, response) {

      if (error) {
        return SlackBot.sendError(
            context,
            error,
            'Sorry, something went wrong.  Please check my logs!');
      }

      // Find members that aren't bots
      var members = '';
      response.members.forEach(function(member) {
        if (member.is_bot) return;
        members = members + member.name +', ';
      });

      members = members + 'excluding the robots...';

      // Return
      return context.done(null, {
        response_type: 'in_channel',
        text: 'These are the members of your team: ' + members
      });
    });
  });
};