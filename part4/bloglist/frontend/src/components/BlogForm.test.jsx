import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls event handler with the right details', async () => {
  const addBlog = vi.fn()

  const container = render(
    <BlogForm addBlog={addBlog} />
  ).container

  const user = userEvent.setup()
  const titleInput = container.querySelector('#title')
  await user.type(titleInput, 'This is a new blog')
  const authorInput = container.querySelector('#author')
  await user.type(authorInput, 'Harry Potter')
  const urlInput = container.querySelector('#url')
  await user.type(urlInput, 'http://example-blog.com')

  const createBlogButton = container.querySelector('#create-blog')
  await user.click(createBlogButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('This is a new blog')
  expect(addBlog.mock.calls[0][0].author).toBe('Harry Potter')
  expect(addBlog.mock.calls[0][0].url).toBe('http://example-blog.com')
})