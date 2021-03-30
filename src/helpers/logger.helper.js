'use strict';
const {createLogger, format, transports} = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'results.log');

module.exports = function(module) {
  const path = module.filename.split('/').slice(-3).join('/');

  const formatCombine = format.combine(
      format.colorize(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.printf(
          (f) =>`${f.timestamp} [${f.level}][${path}]: ${f.message}`,
      ),
  );

  const transportCustom = [
    new transports.File({filename}),
  ];

  if (process.env.NODE_ENV === 'local') {
    transportCustom.push(
        new transports.Console({level: 'info', format: formatCombine}),
    );
  }

  return createLogger({
    // change level if in dev environment versus production
    level: env === 'development' ? 'debug' : 'info',
    format: formatCombine,
    transports: transportCustom,
  });
};
