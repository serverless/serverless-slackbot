/**
 * Event: authorized
 * - Fires after someone has authorized your SlackBot
 */

var Slack = require('slack-node');

module.exports = function(SlackBot) {

  SlackBot.addEvent('authorized', function(event, context, SlackBot) {

    // Instantiate SlackSDK
    var slack = new Slack(SlackBot.access_token);
    slack.setWebhook(SlackBot.incoming_webhook_url);
    slack.webhook({
      text: 'Woo!  You\'ve connected me to your channel!'
    }, function(error, response) {

      if (error) return SlackBot.sendError(
          context,
          error,
          "Sorry, something went wrong with the authorization process");

      // Send Response
      return context.done(null, { text: 'Success!  You\'ve connected me!' });
    });
  });
};