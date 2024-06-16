const { describe, beforeEach, test, expect } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'Nick220505',
        password: '123',
        name: 'Nicolas Pardo'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'Nick220505', '123')
      await expect(page.getByText('blogs')).toBeVisible()
      await expect(page.getByText('Nicolas Pardo logged in')).toBeVisible()
    })
    
    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'Nick220505', 'wrongPassword')
    
      const notificationElement = page.locator('.notification')
      await expect(notificationElement).toHaveText('wrong username or password')
      await expect(notificationElement).toHaveCSS('color', 'rgb(255, 0, 0)')
    
      await expect(page.getByText('Nicolas Pardo logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'Nick220505', '123')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'This is a new blog', 'Harry Potter', 'http://example-blog.com')
      
      const newBlogElement = page.locator('.blog-content')
      await expect(newBlogElement.getByText('This is a new blog')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await createBlog(page, 'This is a new blog', 'Harry Potter', 'http://example-blog.com')
      await page.getByRole('button', { name: 'view' }).click()

      await expect(page.getByText('likes 0')).toBeVisible()

      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('blog can be deleted by the user who added it', async ({ page }) => {
      await page.pause()
      await createBlog(page, 'This is a new blog', 'Harry Potter', 'http://example-blog.com')
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', async dialog => {
        expect(dialog.message()).toEqual('Remove blog This is a new blog by Harry Potter')
        return dialog.accept()
      })
      await page.getByRole('button', { name: 'remove' }).click()
      const notificationElement = page.locator('.notification')
      await expect(notificationElement).toHaveText('blog This is a new blog by Harry Potter has been removed')
      const blogElement = page.locator('.blog-content')
      await expect(blogElement).not.toBeVisible()
    })

    test('only the user who added the blog sees the blog\'s delete button', async ({ page, request }) => {
      await createBlog(page, 'This is a new blog', 'Harry Potter', 'http://example-blog.com')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
      await page.getByRole('button', { name: 'logout' }).click()
      await request.post('/api/users', {
        data: {
          username: 'newUser',
          password: '456',
          name: 'Another user'
        }
      })
      await loginWith(page, 'newUser', '456')
      await expect(page.getByText('blogs')).toBeVisible()
      await expect(page.getByText('Another user logged in')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blogs are arranged in order according to likes, blog with most likes is shown first', async ({ page }) => {
      test.setTimeout(15000)
      await createBlog(
        page,
        'First class tests',
        'Robert C. Martin',
        'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
      )
      await createBlog(
        page,
        'Go To Statement Considered Harmful',
        'Edsger W. Dijkstra',
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
      )

      const blogsLocator = page.locator('.blog-content')
      await expect(blogsLocator).toHaveCount(2)

      await expect(blogsLocator.first().getByText('First class tests')).toBeVisible()
      await expect(blogsLocator.last().getByText('Go To Statement Considered Harmful')).toBeVisible()

      const firstBlog = blogsLocator.filter({ hasText: 'First class tests' })
      await firstBlog.getByRole('button', { name: 'view' }).click()
      for (let i = 0; i < 5; i++) {
        await firstBlog.getByRole('button', { name: 'like' }).click()
        await expect(firstBlog.getByText(`likes ${i + 1}`)).toBeVisible()
      }
      await expect(firstBlog.getByText('likes 5')).toBeVisible()

      const secondBlog = blogsLocator.filter({ hasText: 'Go To Statement Considered Harmful' })
      await secondBlog.getByRole('button', { name: 'view' }).click()
      for (let i = 0; i < 10; i++) {
        await secondBlog.getByRole('button', { name: 'like' }).click()
        await expect(secondBlog.getByText(`likes ${i + 1}`)).toBeVisible()
      }
      await expect(secondBlog.getByText('likes 10')).toBeVisible()

      await expect(blogsLocator.first().getByText('Go To Statement Considered Harmful')).toBeVisible()
      await expect(blogsLocator.last().getByText('First class tests')).toBeVisible()
    })
  })
})