serverless-slackbot
===================

A Serverless Module featuring a SlackBot you can easily add skills to and package up as a Slack Application for distribution.  All without servers...

We love Slack and their RTM (websockets) API is cool but we want to build bots without maintaining and paying for servers (we're Serverless!).  So, we built a powerful SlackBot that runs exclusively on *AWS Lambda*, *API Gateway* & *DynamoDB*.  You can easily add skills to it and it's ready to be distributed as a Slack Application and used by multiple Slack teams :)

#### Features
* Quick set-up
* Easily add skills
* No monthly server costs
* Infinitely scalable (thanks to AWS Lambda and DynamoDB)
* Pay only when your bot is called (thanks to AWS Lambda, again)
* Do most of what you can do with Slack's RTM (websockets) API allows you to do
* Packaged as a Slack App ready for distribution
* Saves Slack Teams separately in DynamoDb.  Ready to be used by millions of Slack Teams
* Multi-stage support (development, production) (thanks to the [Serverless Framework](http://www.serverless.com))
* Slack API is pre-configured.  Your bot can do all types of neat things in Slack

#### Downsides
* Some features that come with websockets/Slack's RTM API are missing, like listening to events and not having to use SlashCommands exclusively.  However, we've done a lot to recreate these features.  If you're clever, you will be able to recreate more of these too ;)

## How It Works
The Serverless-SlackBot is called using a single Slack SlashCommand, which is the name of the bot.  For example, in Slack you would type: `/charlie help`.  The Serverless-SlackBot is trained to listen for the words immediately after the SlashCommand.  You can specify skills (aka functions) that fire based on the first word or the first and second word combined.


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