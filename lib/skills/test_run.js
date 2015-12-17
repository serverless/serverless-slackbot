/**
 * Test: Run
 */

module.exports = function(SlackBot) {

  SlackBot.addSkill('test', 'run', function(event, context, body) {

    console.log("Here test run: ", body);

    return context.done(null, { text: 'Success!  Your test has passed and I am working!' });

  });
};