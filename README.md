serverless-slackbot
===================

A Serverless Module featuring a SlackBot you can easily add skills to and package as a Slack Application, ready for distribution.  All without servers!

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
* Some features that come with websockets/Slack's RTM API aren't availabe on this architecture (AWS has no websockets service), like listening to events and not having to use SlashCommands exclusively.  However, we've done a lot to recreate these features.  If you're clever with the Slack API, you will be able to recreate more of these ;)

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
* Deploy the module's require resources on AWS with:
```
$ serverless resources deploy
```
* Register a Slack Application
* Register one SlashCommand for your application.  We recommend it being the name of your bot (e.g., Charles)
* Set the following environment variables in your Serverless Project.  Use `$ serverless env set` and `$ serverless env list`
  * **SLACK_OAUTH_CLIENT_ID**
  * **SLACK_OAUTH_CLIENT_SECRET**

* Deploy the functions and endpoints with:
```
$ serverless dash deploy
```
* Make a **Add to Slack** button and also make sure you add the correct [Slack Scopes](https://api.slack.com/docs/oauth-scopes) that your bot will require.  Here is a good starter template with some popular scopes:
```
https://slack.com/oauth/authorize?scope=incoming-webhook+commands+bot+team%3Aread+users%3Aread+chat%3Awrite%3Abot+emoji%3Aread+reactions%3Awrite&client_id=YOURSLACKCLIENTIDGOESHERE
```

## Building Your Bot

#### Adding Skills
Every file in the module's `skills` folder is automatically loaded, so just add files in there to add skills.  Reference the existing skills in the `skills` folder for examples, or simply copy them.

#### Adding Events
Your Serverless-SlackBot also features a neat event handler system.  We're not entirely sure how this will grow.  Currently, it only handles one event: what happens when authorization is completed.

#### Slack API Operations
The Serverless-SlackBot comes with [slack-node npm module](https://github.com/clonn/slack-node-sdk).  Check out its README for information on how to use it.  But it is pre-configured with the current Slack Team's access token and ready for use here:
```
SlackBot.Slack
```
You can use it like this:
```
SlackBot.Slack.api('users.list', function(error, response) {});
```
