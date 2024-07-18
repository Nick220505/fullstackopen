import request from 'supertest';
import bcrypt from 'bcrypt';
import { db } from '@/utils';
import app from '@/app';
import { User } from '@/models';

describe('Auth API', () => {
  beforeAll(async () => {
    await db.connect();
  });
  beforeEach(async () => {
    await User.truncate({ cascade: true });
    await User.create({
      name: 'Harry Potter',
      username: 'harry@example.com',
      passwordHash: await bcrypt.hash('secret', 10),
    });
  });

  describe('POST /auth/login', () => {
    it('should login and return token with correct credentials', async () => {
      const response = await request(app).post('/auth/login').send({
        username: 'harry@example.com',
        password: 'secret',
      });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeTruthy();
    });
    it('should not login and return 401 with wrong credentials', async () => {
      const response = await request(app).post('/auth/login').send({
        username: 'harry@example.com',
        password: 'wrong',
      });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid username or password');
    });
  });

  describe('DELETE /auth/logout', () => {
    it('should logout and return message', async () => {
      const response = await request(app).delete('/auth/logout');
      expect(response.status).toBe(204);
    });
  });

  afterAll(async () => {
    await db.close();
  });
});
