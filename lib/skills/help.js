/**
 * Help
 */

module.exports = function(SlackBot) {

  SlackBot.addSkill('help', null, function(event, context, body, slackTeam) {

    // Return
    return context.done(null, {
      response_type: 'in_channel',
      text: 'You don\'t need an alarm clock, let your dreams wake you.'
    });
  });
};