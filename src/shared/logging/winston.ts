import winston from 'winston';

const getColor = (level: string) => {
  switch (level.toUpperCase()) {
    case 'ERROR':
      return '\x1b[1;31m'; // Vermelho
    case 'WARN':
      return '\x1b[1;33m'; // Amarelo
    case 'INFO':
      return '\x1b[1;32m'; // Verde
    case 'DEBUG':
      return '\x1b[1;36m'; // Ciano
    default:
      return '\x1b[0m'; // Reset
  }
};

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    const color = getColor(level);
    const levelUpper = level.toUpperCase();
    return `${timestamp} [${color}${levelUpper}\x1b[0m] ${message}`;
  }),
);

const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  format,
  transports: [new winston.transports.Console()],
});

export default logger;
