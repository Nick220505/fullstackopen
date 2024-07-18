import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports:
    process.env['NODE_ENV'] === 'test'
      ? [new transports.Console({ silent: true })]
      : [new transports.Console()],
});

export default logger;
