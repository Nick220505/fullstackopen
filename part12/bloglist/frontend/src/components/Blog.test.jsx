import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Blog from './Blog'

describe('<Blog />', () => {
  it('renders the blog title and links to the blog details page', () => {
    const blog = {
      id: '12345',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      likes: 10,
    }

    render(
      <MemoryRouter>
        <Blog blog={blog} />
      </MemoryRouter>,
    )
    const linkElement = screen.getByRole('link', { name: blog.title })
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', `/blogs/${blog.id}`)
  })
})
