import logger from './logger';

const { DATABASE_URL, NODE_ENV, JWT_SECRET, SESSION_SECRET } = process.env;

const requiredEnvVars = [
  { name: 'DATABASE_URL', value: DATABASE_URL },
  { name: 'NODE_ENV', value: NODE_ENV },
  { name: 'JWT_SECRET', value: JWT_SECRET },
  { name: 'SESSION_SECRET', value: SESSION_SECRET },
];

requiredEnvVars.forEach(({ name, value }) => {
  if (!value) {
    logger.error(`${name} is not defined`);
    process.exit(1);
  }
});

export { DATABASE_URL, NODE_ENV, JWT_SECRET, SESSION_SECRET };
