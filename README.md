![Serverless Slack Bot AWS Lambda API Gateway](https://servant-assets.s3.amazonaws.com/img/serverless_slackbot_readme2.gif)
serverless-slackbot
===================

A Serverless Module for the [Serverless Framework](http://www.serverless.com) featuring a SlackBot you can easily add skills to and package as a Slack Application, ready for distribution.  All without servers!

We love Slack and their RTM (websockets) API is cool but we want to build dirt-cheap bots that don't require maintaining and paying for servers (we're Serverless!).  So, we built a powerful SlackBot that runs exclusively on *AWS Lambda*, *API Gateway* & *DynamoDB*.  Plus, you can easily add skills to it and it's ready to be distributed as a Slack Application, used by multiple Slack teams :)

#### Features
* Quick set-up
* Easily add skills
* No monthly server costs
* Infinitely scalable (thanks to AWS Lambda and DynamoDB)
* Pay only when your bot is called (thanks to AWS Lambda, again)
* Do most of what you can do with Slack's RTM (websockets) API
* Packaged as a Slack App ready for distribution
* Saves Slack Teams separately in DynamoDB.  Ready to be used by millions of Slack Teams
* Multi-stage support (development, production) (thanks to the [Serverless Framework](http://www.serverless.com))
* Slack API is pre-configured.  Your bot can do all types of neat Slack functions out-of-the-box (e.g., search messages, list users, etc.).

#### Downsides
* Some features that come with websockets/Slack's RTM API aren't availabe on this architecture (AWS has no websockets service), like listening to events and not having to use SlashCommands exclusively.  However, we've done a lot to recreate these features.  If you're clever with the [Slack API](https://api.slack.com/methods), you will be able to recreate more of these ;)

## How It Works
After you register a Slack Application, register a single Slack SlashCommand for it, and name the SlashCommand after your bot's name.  This SlashCommand and the words included after it are what instruct the bot.

For example, if you type this in Slack: `/charlie help`.  Slack will send the text to your Serverless-SlackBot, which is trained to listen for the words immediately after the SlashCommand, in this case: `help`.

A **Skill** is function that your Serverless-SlackBot performs based on the word(s) entered in the SlashCommand.  A **Skill** can listen to only the first word, or the first two words, allowing you to include a verb.  For example, `/charlie send email` can do one thing, while `/charlie read email` can do another thing.

## Set-Up
* Open a Serverless Project, or create a new one with:
```
$ serverless project create
```
* Inside your project, run
```
$ serverless module install https://github.com/serverless/serverless-slackbot
```
* Deploy the module's required resources on AWS with:
```
$ serverless resources deploy
```
* Deploy the functions and endpoints with:
```
$ serverless dash deploy
```
* Make note of the endpoints that was returned to you. You'll use them to set up the Slack app in the next step

* Register a Slack Application
* Add the GET endpoint that was returned to you in the previous step to the "Redirect URI" field
* Register one SlashCommand for your application. We recommend it being the name of your bot (e.g., Charles). For the SlashCommand endpoint, add the POST endpoint that was returned to you in the previous step. Make note of the "Verification Token" that Slack generated for your Slash Command. We use this token to validate that the POST request really is coming from Slack.

* Copy the "Client ID", "Client Secret" and "Verification Token" you created with your application and Set the following environment variables in your Serverless Project.  Use `$ serverless env set` and `$ serverless env list`
  * **SLACK_OAUTH_CLIENT_ID**
  * **SLACK_OAUTH_CLIENT_SECRET**
  * **SLACK_TOKEN**
  * **PROJECT_NAME**
  
  
* deploy the functions again with `serverlesss function deploy` to update the env vars.

* Make an **Add to Slack** button and also make sure you add the correct [Slack Scopes](https://api.slack.com/docs/oauth-scopes) that your bot will require.  Here is a good starter template with some popular scopes:
```
https://slack.com/oauth/authorize?scope=incoming-webhook+commands+bot+team%3Aread+users%3Aread+chat%3Awrite%3Abot+emoji%3Aread+reactions%3Awrite&client_id=YOURSLACKCLIENTIDGOESHERE
```
* Authorize and test your new Slack appliaction by visting the previous authorization url. After you authorize, you should be notified of the success of the authorization in your Slack team. try `/<your-slash-command> help`  and make sure everything is working great.

## Building Your Bot

#### Adding Skills
Every file in the module's `skills` folder is automatically loaded, so just add files in there to add skills.  Reference the existing skills in the `skills` folder for examples, or simply copy them. After you add your new skills, deploy your changes with `serverless function deploy` and choose the `incoming` function. Your new skill should be available right away and you can try it out on Slack.

#### Adding Events
Your Serverless-SlackBot also features a neat event handler system.  We're not entirely sure how this will grow.  Currently, it only handles one event: what happens when authorization is completed.

#### Slack Teams Are Pre-Loaded
Every time a SlashCommand sends a request to your Serverless-SlackBot, the Slack Team sending the request is loaded from DynamoDB.  Their access token is then used to instantiate a Slack SDK (read more on this below) and their team data is submitted as a parameter in every Skills function.  It's pretty convenient :)

#### Slack API Operations
The Serverless-SlackBot comes with [slack-node npm module](https://github.com/clonn/slack-node-sdk).  Check out its README for information on how to use it.  But it is pre-configured with the current Slack Team's access token and ready for use here:
```
SlackBot.Slack
```
You can use it like this:
```
SlackBot.Slack.api('users.list', function(error, response) {});
```
Here is the [documentation on the Slack API methods](https://api.slack.com/methods).  Make sure you have the right Slack Scope to use these!

Good luck,
[Serverless Team](http://www.serverless.com)
