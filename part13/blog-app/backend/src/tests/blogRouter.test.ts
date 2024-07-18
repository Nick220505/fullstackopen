import request from 'supertest';
import bcrypt from 'bcrypt';
import { db, apiTestHelper as helper } from '@/utils';
import app from '@/app';
import { Blog, User } from '@/models';

describe('Blog API', () => {
  beforeAll(async () => {
    await db.connect();
  });

  let token: string;

  beforeEach(async () => {
    await Blog.truncate({ cascade: true });
    await User.truncate({ cascade: true });
    await User.create({
      name: 'Harry Potter',
      username: 'harry@example.com',
      passwordHash: await bcrypt.hash('secret', 10),
    });

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

    await request(app)
      .post('/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        title: 'TDD harms architecture',
        likes: 5,
      });
  });

  describe('GET /', () => {
    it('should get all blogs with the right format and status code', async () => {
      const response = await request(app).get('/blogs');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body).toHaveLength(2);
    });
    it('should get all blogs with the correct information', async () => {
      const response = await request(app).get('/blogs');
      const authors = response.body.map((blog: Blog) => blog.author);
      expect(authors).toEqual(['Robert C. Martin', 'Edsger W. Dijkstra']);

      const urls = response.body.map((blog: Blog) => blog.url);
      expect(urls).toEqual([
        'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      ]);

      const titles = response.body.map((blog: Blog) => blog.title);
      expect(titles).toEqual([
        'TDD harms architecture',
        'Canonical string reduction',
      ]);

      const likes = response.body.map((blog: Blog) => blog.likes);
      expect(likes).toEqual([5, 0]);

      expect(response.body[0].user.name).toBe('Harry Potter');
      expect(response.body[1].user.name).toBe('Harry Potter');
    });
    it('should return blogs in descending order of likes', async () => {
      await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send({
          author: 'John Doe',
          url: 'http://example.com',
          title: 'Most liked blog',
          likes: 10,
        });
      const response = await request(app).get('/blogs');
      expect(response.body[0].likes).toBeGreaterThan(response.body[1].likes);
      expect(response.body[1].likes).toBeGreaterThan(response.body[2].likes);
      expect(response.body[0].likes).toBe(10);
    });
    describe('When search query is provided', () => {
      it('should search by title', async () => {
        const response = await request(app).get('/blogs?search=Canonical');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe('Canonical string reduction');
      });

      it('should search by author', async () => {
        const response = await request(app).get('/blogs?search=Martin');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toHaveLength(1);
        expect(response.body[0].author).toBe('Robert C. Martin');
      });

      it('should search case insensitive', async () => {
        const response = await request(app).get('/blogs?search=canonical');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe('Canonical string reduction');
      });

      it('should return no results when no match is found', async () => {
        const response = await request(app).get('/blogs?search=nonexistent');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toHaveLength(0);
      });
    });
  });

  describe('GET /:id', () => {
    it('should get a blog with the right format and status code', async () => {
      const id = await helper.getFirstObjectId(Blog);
      const response = await request(app).get(`/blogs/${id}`);
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
    });
    it('should get a blog with the correct information', async () => {
      const id = await helper.getFirstObjectId(Blog);
      const response = await request(app).get(`/blogs/${id}`);
      expect(response.body.author).toBe('Edsger W. Dijkstra');
      expect(response.body.url).toBe(
        'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      );
      expect(response.body.title).toBe('Canonical string reduction');
      expect(response.body.likes).toBe(0);
      expect(response.body.user.name).toBe('Harry Potter');
    });
  });

  describe('POST /', () => {
    it('should create a blog with the right format and status code', async () => {
      const response = await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send({
          author: 'Grace Hopper',
          url: 'https://en.wikipedia.org/wiki/Grace_Hopper',
          title: 'Invention of the Compiler',
          likes: 0,
        });
      expect(response.status).toBe(201);
      expect(typeof response.body).toBe('object');
      expect(response.body.author).toBe('Grace Hopper');
      expect(response.body.url).toBe(
        'https://en.wikipedia.org/wiki/Grace_Hopper',
      );
      expect(response.body.title).toBe('Invention of the Compiler');
      expect(response.body.likes).toBe(0);
    });
    describe('When year written is provided', () => {
      it('should create a blog with a valid year written', async () => {
        const response = await request(app)
          .post('/blogs')
          .set('Authorization', `Bearer ${token}`)
          .send({
            author: 'Grace Hopper',
            url: 'https://en.wikipedia.org/wiki/Grace_Hopper',
            title: 'Invention of the Compiler',
            likes: 0,
            yearWritten: 2000,
          });
        expect(response.status).toBe(201);
        expect(typeof response.body).toBe('object');
        expect(response.body.yearWritten).toBe(2000);
      });

      it('should not create a blog with a year written below 1991', async () => {
        const response = await request(app)
          .post('/blogs')
          .set('Authorization', `Bearer ${token}`)
          .send({
            author: 'Grace Hopper',
            url: 'https://en.wikipedia.org/wiki/Grace_Hopper',
            title: 'Invention of the Compiler',
            likes: 0,
            yearWritten: 1950,
          });
        expect(response.status).toBe(400);
        expect(typeof response.body).toBe('object');
        expect(response.body.error[0]).toBe(
          'Validation error: Year written must be at least 1991.',
        );
      });

      it('should not create a blog with a year written above the current year', async () => {
        const response = await request(app)
          .post('/blogs')
          .set('Authorization', `Bearer ${token}`)
          .send({
            author: 'Grace Hopper',
            url: 'https://en.wikipedia.org/wiki/Grace_Hopper',
            title: 'Invention of the Compiler',
            likes: 0,
            yearWritten: new Date().getFullYear() + 1,
          });
        expect(response.status).toBe(400);
        expect(typeof response.body).toBe('object');
        expect(response.body.error[0]).toBe(
          'Validation error: Year written must be at most the current year.',
        );
      });
    });
  });

  describe('PUT /:id', () => {
    it('should update a blog with the correct format, status code, and number of likes', async () => {
      const id = await helper.getFirstObjectId(Blog);
      const response = await request(app)
        .put(`/blogs/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ likes: 5 });
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
      expect(response.body.author).toBe('Edsger W. Dijkstra');
      expect(response.body.url).toBe(
        'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      );
      expect(response.body.title).toBe('Canonical string reduction');
      expect(response.body.likes).toBe(5);
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a blog with the right status code by the user who created it', async () => {
      const id = await helper.getFirstObjectId(Blog);
      const response = await request(app)
        .delete(`/blogs/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(204);

      expect(await Blog.findByPk(id)).toBeNull();
    });
    it('should not delete a blog with the right status code by the user who did not create it', async () => {
      await User.create({
        name: 'Hermione Granger',
        username: 'hermione@example.com',
        passwordHash: await bcrypt.hash('secret', 10),
      });
      let response;
      response = await request(app).post('/auth/login').send({
        username: 'hermione@example.com',
        password: 'secret',
      });
      token = response.body.token as string;
      const id = await helper.getFirstObjectId(Blog);
      response = await request(app)
        .delete(`/blogs/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(401);

      expect(await Blog.findByPk(id)).not.toBeNull();
    });
  });

  afterAll(async () => {
    await db.close();
  });
});
