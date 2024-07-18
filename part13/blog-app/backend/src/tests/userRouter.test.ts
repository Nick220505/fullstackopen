import request from 'supertest';
import bcrypt from 'bcrypt';
import { db, apiTestHelper as helper } from '@/utils';
import app from '@/app';
import { User } from '@/models';

describe('User API', () => {
  beforeAll(async () => {
    await db.connect();
  });

  beforeEach(async () => {
    await User.truncate({ cascade: true });
    await User.bulkCreate([
      {
        name: 'Harry Potter',
        username: 'harry@example.com',
        passwordHash: await bcrypt.hash('secret1', 10),
        admin: true,
      },
      {
        name: 'Hermione Granger',
        username: 'hermione@example.com',
        passwordHash: await bcrypt.hash('secret2', 10),
      },
    ]);
  });

  describe('GET /', () => {
    it('should get all users with the right format and status code', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body).toHaveLength(2);
    });
    it('should get all users with the correct information', async () => {
      const response = await request(app).get('/users');
      expect(Array.isArray(response.body)).toBeTruthy();
      const userNames = (response.body as User[]).map((user) => user.username);
      expect(userNames).toContain('harry@example.com');
      expect(userNames).toContain('hermione@example.com');

      const names = (response.body as User[]).map((user) => user.name);
      expect(names).toContain('Harry Potter');
      expect(names).toContain('Hermione Granger');

      const passwordHashes = (response.body as User[]).map(
        (user) => user.passwordHash,
      );
      expect(passwordHashes).toContain(undefined);
      expect(passwordHashes).toContain(undefined);
    });
  });

  describe('GET /:id', () => {
    it('should get a user with the right format and status code', async () => {
      const id = await helper.getFirstObjectId(User);
      const response = await request(app).get(`/users/${id}`);
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
      expect(response.body.passwordHash).toBeUndefined();
    });
    it('should get a user with the correct information', async () => {
      const id = await helper.getFirstObjectId(User);
      const response = await request(app).get(`/users/${id}`);
      expect(response.body.name).toBe('Harry Potter');
      expect(response.body.username).toBe('harry@example.com');
      expect(response.body.passwordHash).toBeUndefined();
    });
  });

  describe('POST /', () => {
    it('should create a user with the right format and status code', async () => {
      const response = await request(app).post('/users').send({
        name: 'Ron Weasley',
        username: 'ron@example.com',
        password: 'secret3',
      });
      expect(response.status).toBe(201);
      expect(typeof response.body).toBe('object');
      expect(response.body.name).toBe('Ron Weasley');
      expect(response.body.username).toBe('ron@example.com');
      expect(response.body.passwordHash).toBeUndefined();
    });
  });
  describe('PUT /:username', () => {
    let token: string;
    beforeEach(async () => {
      const response = await request(app).post('/auth/login').send({
        username: 'harry@example.com',
        password: 'secret1',
      });
      token = response.body.token as string;
    });
    it('should update the username of existing user correctly', async () => {
      const response = await request(app)
        .put('/users/harry@example.com')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'harrypotter@example.com',
        });
      expect(response.status).toBe(200);
      expect(response.body.username).toBe('harrypotter@example.com');
    });
    it('should return 404 if the user does not exist', async () => {
      const response = await request(app)
        .put('/users/nonexistent@example.com')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'nonexistent@example.com',
        });
      expect(response.status).toBe(404);
    });
    it('should return 401 if the logged in user is not an admin', async () => {
      let response;
      response = await request(app).post('/auth/login').send({
        username: 'hermione@example.com',
        password: 'secret2',
      });
      token = response.body.token as string;

      response = await request(app)
        .put('/users/harry@example.com')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'harrypotter@example.com',
        });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Operation not allowed');
    });
  });

  afterAll(async () => {
    await db.close();
  });
});
