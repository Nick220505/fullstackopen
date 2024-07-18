import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { DATABASE_URL, NODE_ENV } from './config';
import logger from './logger';

export const sequelize = new Sequelize(DATABASE_URL!, {
  logging: NODE_ENV === 'development',
});

const migrationConf = {
  migrations: {
    glob: 'src/migrations/*.ts',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  logger.info(
    `Migrations up to date${migrations.length > 0 ? ` => files: ${migrations.map((mig) => mig.name)}` : ''}`,
  );
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

const connect = async () => {
  await sequelize.authenticate();
  await runMigrations();
};

const close = async () => {
  await sequelize.close();
};

export default { connect, close, rollbackMigration };
