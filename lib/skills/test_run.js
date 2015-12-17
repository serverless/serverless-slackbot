/**
 * Test: Run
 */

module.exports = function(SlackBot) {

  SlackBot.addSkill('test', 'run', function(event, context, body, bot) {

    return context.done(null, { text: 'Success!  Your test has passed.  I am working!' });

  });
};