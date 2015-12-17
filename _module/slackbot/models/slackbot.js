'use strict';

/**
 * Model: SlackBot
 * - A Slack team that has authorized your Slack Application
 */

var  AWS     = require('aws-sdk'),
    fs       = require('fs'),
    Slack    = require('slack-node'),
    request  = require('request');

// Configure DynamoDb
var dynamoConfig = {
  sessionToken:    process.env.AWS_SESSION_TOKEN,
  region:          process.env.AWS_REGION
};
var dynamodbDocClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);
var tableName = 'serverless-slackbot-slackbots-' + process.env.SERVERLESS_DATA_MODEL_STAGE;

/**
 * SlackBot
 */

var SlackBot = {
  skills: {}
};

/**
 * Process
 */

SlackBot.process = function(context, event) {

  



};

/**
 * Add Skill
 */

SlackBot.addSkill = function(context, action, func) {
  if (!this.skills[context]) this.skills[context] = {};
  this.skills[context][action] = func;
};

/**
 * Show
 */

SlackBot.show = function(teamId, cb) {

  var params = {
    TableName : tableName,
    Key: {
      id: teamId
    }
  };

  return dynamodbDocClient.get(params, cb);
};

/**
 * Save
 */

SlackBot.save = function(team, cb) {

  var params = {
    TableName : tableName,
    Item: team,
    ReturnValues: 'ALL_OLD'
  };

  dynamodbDocClient.put(params, cb);
};

/**
 * Send Error
 */

SlackBot.sendError = function(context, error, message) {
  console.log("---------- Error " + Math.floor(Date.now() / 1000) + ':');
  console.log(error);
  console.log(message);
  console.log(context);
  return context.done(message, null);
};

/**
 * Load Skills
 */

SlackBot.loadSkills = function(path) {

  var _this = this;

  // Load Abilities
  fs.readdirSync(path).forEach(function(file) {
    var newPath = path.join(path, file);
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js|coffee)/.test(file)) {
        require(newPath)(_this);
      }
    }
  });
};

/**
 * Authorize
 */

SlackBot.authorize = function(event, context) {

  var _this = this;

  // Check Environment Variables are defined
  if (!process.env.SLACK_OAUTH_CLIENT_ID || !process.env.SLACK_OAUTH_CLIENT_SECRET) {
    return _this.sendError(context, 'Missing required Slackbot environment variables', {
      message: "Sorry, something went wrong with the authorization process"
    });
  }

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
    if (error || response.statusCode !== 200) return _this.sendError(context, error, {
      message: "Sorry, something went wrong with the authorization process"
    });

    // Parse stringified JSON
    body = JSON.parse(body);

    // Set team attributes
    var slackBot = {
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

    // Create or Update bot
    _this.save(slackBot, function(error) {

      // Return error
      if (error) return _this.sendError(context, error, {
        message: "Sorry, something went wrong with the authorization process"
      });

      // Send incoming webhook
      Slack.sendIncomingWebhook(
          slackBot.access_token,
          {
            webhookUri:  slackBot.incoming_webhook.url,
            text:        'Success, you have just connected me!'
          },
          function(error, result) {

            if (error) return _this.sendError(context, error, {
              message: "Sorry, something went wrong with the authorization process"
            });

            // Return response
            return context.done(null, {
              message: 'Your team has successfully connected to this bot!'
            });
          }
      );
    });
  });
};

module.exports = SlackBot;