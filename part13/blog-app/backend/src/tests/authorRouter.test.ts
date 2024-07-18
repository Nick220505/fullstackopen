import request from 'supertest';
import bcrypt from 'bcrypt';
import { db } from '@/utils';
import app from '@/app';
import { Blog, User } from '@/models';

describe('Author API', () => {
  beforeAll(async () => {
    await db.connect();
  });

  beforeEach(async () => {
    await Blog.truncate({ cascade: true });
    await User.truncate({ cascade: true });

    const user = await User.create({
      username: 'ron@example.com',
      name: 'Ron Weasley',
      passwordHash: await bcrypt.hash('secret', 10),
    });

    await Blog.bulkCreate([
      {
        author: 'Jami Kousa',
        url: 'http://example.com/jami1',
        title: "Jami's first blog",
        likes: 3,
        userId: user.id,
      },
      {
        author: 'Jami Kousa',
        url: 'http://example.com/jami2',
        title: "Jami's second blog",
        likes: 4,
        userId: user.id,
      },
      {
        author: 'Jami Kousa',
        url: 'http://example.com/jami3',
        title: "Jami's third blog",
        likes: 3,
        userId: user.id,
      },
      {
        author: 'Kalle Ilves',
        url: 'http://example.com/kalle',
        title: "Kalle's blog",
        likes: 2,
        userId: user.id,
      },
      {
        author: 'Dan Abramov',
        url: 'http://example.com/dan',
        title: "Dan's blog",
        likes: 4,
        userId: user.id,
      },
    ]);
  });

  describe('GET /', () => {
    it('should get all authors with the right format and status code', async () => {
      const response = await request(app).get('/authors');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body).toHaveLength(3);
    });

    it('should return correct author data with articles count and total likes', async () => {
      const response = await request(app).get('/authors');
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            author: 'Jami Kousa',
            articles: '3',
            likes: '10',
          }),
          expect.objectContaining({
            author: 'Kalle Ilves',
            articles: '1',
            likes: '2',
          }),
          expect.objectContaining({
            author: 'Dan Abramov',
            articles: '1',
            likes: '4',
          }),
        ]),
      );
    });

    it('should return authors ordered by total likes in descending order', async () => {
      const response = await request(app).get('/authors');
      const authors = response.body;
      expect(authors[0].author).toBe('Jami Kousa');
      expect(authors[0].likes).toBe('10');
      expect(authors[1].author).toBe('Dan Abramov');
      expect(authors[1].likes).toBe('4');
      expect(authors[2].author).toBe('Kalle Ilves');
      expect(authors[2].likes).toBe('2');
    });
  });

  afterAll(async () => {
    await db.close();
  });
});
