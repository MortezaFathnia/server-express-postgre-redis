const { format, transports } = require('winston');
const { timestamp, combine, label, printf } = format;

const logLabel = 'My App';
const date = require('../date');
const currectDate = date.getFullDate();

const colourfulFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp.slice(0, 19).replace('T', ' ')} - [${label}] ${level}: ${message}`;
});

const simpleFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp.slice(0, 19).replace('T', ' ')} - [${label}] ${level}: ${message}`;
});

module.exports = {
  exceptions: [
    new transports.File({ 
      filename: `./logs/exceptions-${currectDate}.log`
    }),
    new transports.Console({
      level: 'silly',
      format: combine(
        format.colorize(),
        label({ label: logLabel }),
        timestamp(),
        colourfulFormat
      )
    })
  ],
  dev: [
    new transports.File({
      filename: `./logs/${currectDate}.log`,
      level: 'info',
      format: combine(
        label({ label: logLabel }),
        timestamp(),
        simpleFormat
      ),
      maxsize: 5120 /* 5Mb */
    }),
    new transports.Console({
      level: 'silly',
      format: combine(
        format.colorize(),
        label({ label: logLabel }),
        timestamp(),
        colourfulFormat
      )
    })
  ],
  test: [
    new transports.Console({
      level: 'info',
      format: combine(
        label({ label: logLabel }),
        timestamp(),
        simpleFormat
      )
    }),
    new transports.File({
      filename: `./logs/${currectDate}.log`,
      format: combine(
        label({ label: logLabel }),
        timestamp(),
        simpleFormat
      ),
      level: 'info',
      maxsize: 10240 /* 10Mb */
    })
  ],
  prod: [
    new transports.Console({
      level: 'warn',
      format: combine(
        label({ label: logLabel }),
        timestamp(),
        simpleFormat
      )
    }),
    new transports.File({
      filename: `./logs/${currectDate}.log`,
      format: combine(
        label({ label: logLabel }),
        timestamp(),
        simpleFormat
      ),
      level: 'warn',
      maxsize: 51200 /* 50Mb */
    })
  ]
};






