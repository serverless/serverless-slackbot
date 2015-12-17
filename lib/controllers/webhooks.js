/**
 * Controller: Webhooks
 * - Webhooks exist outside of Slack Apps.  But here is some boilerplate for them anyway.
 * - event.body includes: token, team_id, team_domain, channel_id, channel_name, timestamp, user_id, user_name, text, trigger_word
 * - Receives an outgoing webhook from Slack (A trigger word was used).
 * - Only works from public channels.  Otherwise, use SlashCommands.
 */

module.exports.receive = function() {

  // Webhooks exist outside of Slack Apps.  There is not much we can offer you here except an endpoint and a function awaiting to be written
  return context.done(null, { text: 'Webhook received'});
};