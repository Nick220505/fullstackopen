import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import { sequelize } from '@/utils/db';
import { SESSION_SECRET, NODE_ENV } from '@/utils/config';

const SequelizeStore = connectSessionSequelize(session.Store);

const sessionMiddleware = session({
  secret: SESSION_SECRET!,
  store: new SequelizeStore({
    db: sequelize,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 30 days
  },
});

export default sessionMiddleware;
