/**
 * Controller: Authorization
 * - Authorizes Slack via Oauth
 */

var Team    = require('../models/team'),
    team    = new Team(),
    Slack   = require('../models/slack'),
    request = require('request');

/**
 * Authorize
 * - Exchanges Code for AccessToken
 */

module.exports.authorize = function(event, context) {

  // Prepare response to get Access Token
  var SlackClientId     = process.env.SLACK_OAUTH_CLIENT_ID;
  var SlackClientSecret = process.env.SLACK_OAUTH_CLIENT_SECRET;

  // Construct URL
  var url = 'https://slack.com/api/oauth.access?'
      + 'client_id=' + SlackClientId + '&'
      + 'client_secret=' + SlackClientSecret + '&'
      + 'code=' + event.code;

  // Add redirect url, if it is set as ENV
  if (process.env.SLACK_AUTH_REDIRECT_URL) {
    url = url + '&redirect_uri=' + process.env.SLACK_AUTH_REDIRECT_URL;
  }

  // Send request to get Access Token
  return request(url, function (error, response, body) {

    // Return error
    if (error || response.statusCode !== 200) {
      console.log(error, response.statusCode);
      return context.done({
        message: "Sorry, something went wrong with the authorization process"
      });
    }

    // Parse stringified JSON
    body = JSON.parse(body);

    // Set team attributes
    var slackTeam = {
      id:                                 body.team_id,
      name:                               body.team_name,
      scope:                              body.scope,
      access_token:                       body.access_token,
      bot_user_id:                        body.bot_user_id,
      bot_access_token:                   body.bot_access_token,
      incoming_webhook_url:               body.incoming_webhook.url,
      incoming_webhook_channel:           body.incoming_webhook.channel,
      incoming_webhook_configuration_url: body.incoming_webhook.configuration_url
    };

    // Create or Update team
    team.save(slackTeam, function(error, slackTeam) {

      // Return error
      if (error) {
        console.log(error);
        return context.done({
          message: "Sorry, something went wrong saving your team's information"
        });
      }

      // Send incoming webhook
      Slack.sendIncomingWebhook(
          body.access_token,
          {
            webhookUri:  body.incoming_webhook.url,
            text:        'Success, you have just connected me!'
          },
          function(error, result) {

            // Return response
            return context.done(null, {
              message: 'Your team has successfully connected to this bot!'
            });
          }
      );
    });
  });
};