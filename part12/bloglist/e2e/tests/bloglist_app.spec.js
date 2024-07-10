const { describe, beforeEach, test, expect } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        username: 'Nick220505',
        password: '123',
        name: 'Nicolas Pardo',
      },
    });
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'Nick220505', '123');
      await expect(page.getByText('Nicolas Pardo logged in')).toBeVisible();
      await expect(page.getByText('Blog App')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'Nick220505', 'wrongPassword');
      await expect(page.getByRole('alert')).toHaveText(
        'wrong username or password'
      );
      await expect(page.getByText('Nicolas Pardo logged in')).not.toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'Nick220505', '123');
    });

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'This is a new blog',
        'Harry Potter',
        'http://example-blog.com'
      );

      await expect(page.getByRole('alert')).toHaveText(
        'blog This is a new blog by Harry Potter has been added'
      );
      await expect(
        page.getByRole('link', { name: 'This is a new blog' })
      ).toBeVisible();
    });

    test('blog can be liked', async ({ page }) => {
      await createBlog(
        page,
        'This is a new blog',
        'Harry Potter',
        'http://example-blog.com'
      );
      await page.getByRole('link', { name: 'This is a new blog' }).click();

      await expect(page.getByText('0 likes')).toBeVisible();

      await page.getByRole('button', { name: 'Like' }).click();

      await expect(page.getByRole('alert')).toHaveText(
        'blog This is a new blog by Harry Potter has been updated'
      );
      await expect(page.getByText('1 likes')).toBeVisible();
    });

    test('blog can be deleted by the user who added it', async ({ page }) => {
      await createBlog(
        page,
        'This is a new blog',
        'Harry Potter',
        'http://example-blog.com'
      );
      await page.getByRole('link', { name: 'This is a new blog' }).click();
      await page.getByRole('button', { name: 'Remove' }).click();
      await expect(page.getByRole('alert')).toHaveText(
        'blog This is a new blog by Harry Potter has been removed'
      );
      await expect(
        page.getByRole('link', { name: 'This is a new blog' })
      ).not.toBeVisible();
    });

    test("only the user who added the blog sees the blog's delete button", async ({
      page,
      request,
    }) => {
      await createBlog(
        page,
        'This is a new blog',
        'Harry Potter',
        'http://example-blog.com'
      );
      await page.getByRole('link', { name: 'This is a new blog' }).click();
      await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
      await page.getByRole('button', { name: 'Logout' }).click();
      await request.post('/api/users', {
        data: {
          username: 'newUser',
          password: '456',
          name: 'Another user',
        },
      });
      await loginWith(page, 'newUser', '456');
      await expect(page.getByText('Blog App')).toBeVisible();
      await expect(page.getByText('Another user logged in')).toBeVisible();
      await page.goto('/');
      await page.getByRole('link', { name: 'This is a new blog' }).click();
      await expect(
        page.getByRole('button', { name: 'Remove' })
      ).not.toBeVisible();
    });
  });
});
