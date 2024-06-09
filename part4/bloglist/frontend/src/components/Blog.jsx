import { useState, useEffect } from 'react'
import Togglable from "./Togglable"
import userService from '../services/users'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {

  const [blogAddedByUser, setBlogAddedByUser] = useState(false)

  useEffect(() => {
    userService
      .getUser(user.username)
      .then(user => {
        if (user.blogs.find(b => b.id === blog.id)) {
          setBlogAddedByUser(true)
        }
      })
  }, [])

  const { id, title, author, url, likes } = blog

  const blogStyle = {
    border: '2px solid black',
    padding: '5px',
    marginBottom: '5px',
    display: 'flex'
  }

  const update = async () => {
    await updateBlog({
      id,
      likes: likes + 1,
      author,
      title,
      url
    })
  }

  const remove = async () => {
    await removeBlog({ id, title, author })
  }


  return (
    <Togglable
      buttonLabelFirstComponent="view"
      buttonLabelSecondComponent="hide"
      style={blogStyle}
    >
      <div>
        {title}
      </div>
      <div>
        {title}
        <br/>
        {url}
        <br/>
        likes {likes}
        <button onClick={update}>
          like
        </button>
        <br/>
        {author}
        <br/>
        {blogAddedByUser && (
          <button onClick={remove}>
            remove
          </button>
        )}
      </div>
    </Togglable>
  )
}

export default Blog