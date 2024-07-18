import request from 'supertest';
import bcrypt from 'bcrypt';
import { db, apiTestHelper as helper } from '@/utils';
import app from '@/app';
import { User, Blog, ReadingList } from '@/models';

describe('ReadingList API', () => {
  beforeAll(async () => {
    await db.connect();
  });

  let token: string;

  beforeEach(async () => {
    await User.truncate({ cascade: true });
    await Blog.truncate({ cascade: true });
    await ReadingList.truncate({ cascade: true });

    await User.bulkCreate([
      {
        name: 'Harry Potter',
        username: 'harry@example.com',
        passwordHash: await bcrypt.hash('secret', 10),
      },
      {
        name: 'Hermione Granger',
        username: 'hermione@example.com',
        passwordHash: await bcrypt.hash('secret', 10),
      },
    ]);
    const response = await request(app).post('/auth/login').send({
      username: 'harry@example.com',
      password: 'secret',
    });
    token = response.body.token as string;

    await request(app)
      .post('/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        title: 'Canonical string reduction',
        likes: 0,
      });

    await ReadingList.create({
      blogId: (await helper.getFirstObjectId(Blog)) ?? 1,
      userId:
        (await User.findOne({ where: { username: 'harry@example.com' } }))
          ?.id ?? -1,
    });
  });
  describe('GET /', () => {
    it('should get all reading lists with the right format and status code', async () => {
      const response = await request(app).get('/readinglists');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body).toHaveLength(1);
    });
  });
  describe('POST /', () => {
    it('should create a reading list with the right format and status code', async () => {
      let response;

      response = await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send({
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
          title: 'TDD harms architecture',
          likes: 5,
        });

      const createdBlogId = response.body.id;

      response = await request(app)
        .post('/readinglists')
        .set('Authorization', `Bearer ${token}`)
        .send({
          blogId: createdBlogId,
          userId:
            (
              await User.findOne({
                where: { username: 'hermione@example.com' },
              })
            )?.id ?? -1,
        });

      expect(response.status).toBe(201);
      expect(response.body.blogId).toBe(createdBlogId);
      expect(response.body.userId).toBe(
        (await User.findOne({ where: { username: 'hermione@example.com' } }))
          ?.id,
      );
    });
  });
  describe('PUT /', () => {
    it('should update a reading list with the right format and status code', async () => {
      const id = await helper.getFirstObjectId(ReadingList);
      const response = await request(app)
        .put(`/readinglists/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ read: true });

      expect(response.status).toBe(200);
      expect(response.body.read).toBe(true);
    });
    it('should not update a reading list when the user is not the owner', async () => {
      const id = await helper.getFirstObjectId(ReadingList);
      let response = await request(app).post('/auth/login').send({
        username: 'hermione@example.com',
        password: 'secret',
      });
      token = response.body.token as string;
      response = await request(app)
        .put(`/readinglists/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ read: 'true' });

      expect(response.status).toBe(403);
      expect(response.body.error).toBe('Forbidden');
    });
  });
  afterAll(async () => {
    await db.close();
  });
});
