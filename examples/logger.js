const winston = require('winston');

winston.level = 'debug';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true, level: 'debug' }),
    new winston.transports.File({ filename: __dirname + '/debug.log', json: false, level: 'debug' })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/error.log', json: false })
  ],
  exitOnError: false
});

module.exports = logger;
