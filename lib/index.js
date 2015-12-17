'use strict';

/**
 * _Module
 */

// Load Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Export
module.exports = {
  authorization:  require('./controllers/authorization'),
  slashcommands:  require('./controllers/slashcommands'),
  webhooks:       require('./controllers/webhooks')
};