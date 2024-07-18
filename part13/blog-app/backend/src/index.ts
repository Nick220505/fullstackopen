import { db, logger } from './utils';
import app from './app';

db.connect()
  .then(() => {
    logger.info('Connected to database');
    const PORT = 3000;
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to connect to database:', error);
    process.exit(1);
  });
