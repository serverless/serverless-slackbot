/**
 * Event: authorized
 * - Fires after someone has authorized your SlackBot
 */

var Slack = require('slack-node');

module.exports = function(SlackBot) {

  SlackBot.addEvent('authorized', function(event, context, slackTeam) {

    // Instantiate SlackSDK
    SlackBot.Slack.setWebhook(slackTeam.incoming_webhook_url);
    SlackBot.Slack.webhook({
      text: 'Wooo!  You\'ve connected me to your channel!'
    }, function(error, response) {

      if (error) return SlackBot.sendError(
          context,
          error,
          "Sorry, something went wrong with the authorization process");

      // Send Response
      return context.done(null, {
        text: 'Success!  You\'ve connected me!  ' +
              'If you set up a custom domain with API Gateway and an SSL certificate, ' +
              'you can use Slack\'s redirect_uri param to redirect the user somewhere else.'
      });
    });
  });
};