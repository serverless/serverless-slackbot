# serverless-slack

This is a Serverless Module that offers Slack boilerplate funcitonality.  This runs without servers (entirely on AWS Lambda).  It is designed to give you almost everything you need to build your own Slack Application and distribute it.

Unfortunately, this doesn't connect/support Slack's RTM (Websockets) API because AWS/Lambda do not support websockets.  But, it still can do tons of great stuff!

**The best part is there are no servers required for this**.  You get charged only when its called and you don't need to worry about scaling :)

## Features:

* Handle Slack App Authorization and store Team data in DynamoDB
* Process Outgoing Webhooks (receive messages coming from Slack)
* Process Incoming Webhooks (post message to Slack)
* Process SlashCommands
* Loaded with [slack-node](https://github.com/clonn/slack-node-sdk) so you can access the full Slack API.
* Uses Lambda and DynamoDb which will allow you to auto-scale infinitely
* Multi-stage support for testing/production/multi-developer teams.

## Getting Started

[Register a Slack App](https://api.slack.com/applications)


In your Serverless project root directory, run:

```
serverless module install https://github.com/serverless/serverless-slack
```

Then deploy the resources that have been added to your Serverless Project's `resources-cd.json` template:

```
serverless deploy resources
```

Set these environment variables in your Serverless Project's Stage and Region, use `serverless env set`:

* SLACK_OAUTH_CLIENT_ID
* SLACK_OAUTH_CLIENT_SECRET
* SLACK_VERIFICATION_TOKEN *(Optional - Recommended to verify requests are coming from Slack)
* SLACK_AUTH_REDIRECT_URL *(Optional - Only set this up if you set up a custom domain with API Gateway)*

Deploy the module's functions and endpoints.  Use the authorization endpoint as the **Redirect URI** for your Slack app.

### Setting Up Slash Commands

In the [application settings page](https://api.slack.com/applications), you can create any number of Slash Commands for your app. Each Slash Command requires an endpoint. You can use the same default `/slack/slashcommand` endpoint that you deployed earlier for all Slash Commands, and in your function logic, you can check which Slash Command was POSTed and act accordingly. Here's how it works...

Open up the Slash Commands controller in `<module-dir>/_module/controllers/slashcommands.js`. By default, you should see the following code:

```javascript

var Slack    = require('../models/slack'),
    response = { text: 'This is a default response' };

module.exports.receive = function(event, context) {

  // Make sure the POST request comes from Slack using the event token
  if (event.token != process.env.EVENT_TOKEN) {
    return context.done('Access Denied');
  }

  // Example Slash Command.
  if (event.command === '/hello') {
    response.text = 'Hey There!';
  }

  return context.done(null, response);
};
```

By default, we're expecting a `/hello` command as an example, you can remove this command and add as many Slash Commands as you want, let's add a `/myname` command. Here's how the controller should look like:

```javascript
var Slack    = require('../models/slack'),
    response = { text: 'This is a default response' };

module.exports.receive = function(event, context) {

  // Make sure the POST request comes from Slack using the event token
  if (event.token != process.env.EVENT_TOKEN) {
    return context.done('Access Denied');
  }

  // Example Slash Command.
  if (event.command === '/hello') {
    response.text = 'Hey There!';
  }

  // Another Slash Command.
  if (event.command === '/myname') {
    response.text = 'Your name is ' + event.user_name;
  }

  return context.done(null, response);
};
```

Now we have both `/hello` and `/myname` commands. You can get super fancy and do whatever you want inside those if statements (check weather, get local time...anything!) and adjust the response accordingly. You can construct the `response` variable to any [valid JSON that Slack expects](https://api.slack.com/slash-commands). If your code gets bigger, you can divide the code up into separate files inside the `_module` directory.