import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import userService from '../services/users'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import {
  setNotification,
  hideNotification,
} from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [blogAddedByUser, setBlogAddedByUser] = useState(false)

  useEffect(() => {
    userService.getUser(user.username).then((user) => {
      if (user.blogs.find((b) => b.id === blog.id)) {
        setBlogAddedByUser(true)
      }
    })
  }, [blog.id, user.username])

  const { id, title, author, url, likes } = blog

  const blogStyle = {
    border: '2px solid black',
    padding: '5px',
    marginBottom: '5px',
    display: 'flex',
  }

  const update = async () => {
    dispatch(
      updateBlog({
        id,
        likes: likes + 1,
        author,
        title,
        url,
      }),
    )
    dispatch(
      setNotification({
        message: `blog ${title} by ${author} has been updated`,
        type: 'success',
      }),
    )
    setTimeout(() => dispatch(hideNotification()), 5000)
  }

  const remove = async () => {
    dispatch(deleteBlog(id))
    dispatch(
      setNotification({
        message: `blog ${title} by ${author} has been removed`,
        type: 'success',
      }),
    )
    setTimeout(() => dispatch(hideNotification()), 5000)
  }

  return (
    <Togglable
      buttonLabelFirstComponent="view"
      buttonLabelSecondComponent="hide"
      className="blog-content"
      style={blogStyle}
    >
      <div>
        <span className="blog-title">{title}</span>
      </div>
      <div>
        <span className="blog-title">{title}</span>
        <br />
        <span className="blog-url">{url}</span>
        <br />
        <span className="blog-likes">likes {likes}</span>
        <button className="like-button" onClick={update}>
          like
        </button>
        <br />
        <span className="blog-author">{author}</span>
        <br />
        {blogAddedByUser && (
          <button className="remove-button" onClick={remove}>
            remove
          </button>
        )}
      </div>
    </Togglable>
  )
}

export default Blog
