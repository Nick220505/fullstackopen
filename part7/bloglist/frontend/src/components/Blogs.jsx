import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const Blogs = ({ user }) => {
  const togglableRef = useRef()
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>There was an error loading the blogs.</div>
  }

  return (
    <div>
      <Togglable
        buttonLabelFirstComponent="create new blog"
        buttonLabelSecondComponent="cancel"
        style={{ marginBottom: '5px' }}
        ref={togglableRef}
      >
        <></>
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default Blogs
