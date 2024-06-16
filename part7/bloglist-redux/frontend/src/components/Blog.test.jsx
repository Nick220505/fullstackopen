import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import userService from '../services/users'

vi.mock('../services/users')

describe('<Blog />', () => {
  let container
  let updateBlog
  let removeBlog

  beforeEach(() => {
    const blog = {
      id: '12345',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      likes: 10,
    }

    const user = {
      username: 'Nick220505',
      name: 'Nicolas Pardo',
    }

    updateBlog = vi.fn()
    removeBlog = vi.fn()

    userService.getUser.mockResolvedValueOnce({
      id: '123',
      name: 'Nicolas Pardo',
      username: 'Nick220505',
      blogs: [{ id: '12345' }],
    })

    container = render(
      <Blog
        blog={blog}
        updateBlog={updateBlog}
        removeBlog={removeBlog}
        user={user}
      />,
    ).container
  })

  test("renders the blog's title, but does not render author, url or number of likes by default", async () => {
    await waitFor(() => {
      expect(screen.getByText('First class tests')).toBeInTheDocument()
      expect(screen.queryByText('Robert C. Martin')).toBeNull()
      expect(
        screen.queryByText(
          'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        ),
      ).toBeNull()
      expect(screen.queryByText('10')).toBeNull()
    })
  })

  test("renders the blog's title, author, url and number of likes when view button clicked ", async () => {
    await waitFor(async () => {
      const user = userEvent.setup()
      const viewButton = container.querySelector('.view-button')
      await user.click(viewButton)
      const hideButton = container.querySelector('.hide-button')
      expect(hideButton).toBeInTheDocument()
      const titleElement = container.querySelector('.blog-title')
      expect(titleElement).toBeInTheDocument()
      const urlElement = container.querySelector('.blog-url')
      expect(urlElement).toBeInTheDocument()
      const likesElement = container.querySelector('.blog-likes')
      expect(likesElement).toBeInTheDocument()
      const authorElement = container.querySelector('.blog-author')
      expect(authorElement).toBeInTheDocument()
    })
  })

  test('calls event handler received as props twice when like button is clicked twice', async () => {
    await waitFor(async () => {
      const user = userEvent.setup()
      const viewButton = container.querySelector('.view-button')
      await user.click(viewButton)
      const likeButton = container.querySelector('.like-button')
      await user.click(likeButton)
      await user.click(likeButton)
      expect(updateBlog.mock.calls).toHaveLength(2)
    })
  })
})
