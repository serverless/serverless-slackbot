/**
 * Test: Run
 */

module.exports = function(SlackBot) {

  SlackBot.addSkill('test', 'run', function(event, context, body, slackTeam) {

    // Return
    return context.done(null, {
      response_type: 'in_channel',
      text: 'Success, your test passed!  I am working!'
    });

  });
};