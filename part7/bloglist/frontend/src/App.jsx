import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const togglableRef = useRef()

  const sortBlogs = (blogs) => {
    return blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then((blogs) => setBlogs(sortBlogs(blogs)))
    }
  }, [])

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessage({
        text: 'wrong username or password',
        type: 'error',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(sortBlogs(blogs.concat(newBlog)))
      togglableRef.current.toggleVisibility()
      setMessage({
        text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        type: 'success',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({ text: 'Error creating blog', type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog)
      setBlogs(
        sortBlogs(
          blogs.map((blog) => {
            if (blog.id === updatedBlog.id) {
              blog = updatedBlog
            }
            return blog
          })
        )
      )
      setMessage({
        text: `blog ${updatedBlog.title} by ${updatedBlog.author} has been updated`,
        type: 'success',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({ text: 'Error updating blog', type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id)
        setBlogs(sortBlogs(blogs.filter((b) => b.id !== blog.id)))
        setMessage({
          text: `blog ${blog.title} by ${blog.author} has been removed`,
          type: 'success',
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setMessage({ text: 'Error removing blog', type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (!user) {
    return (
      <div>
        {message && <Notification message={message} />}
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message && <Notification message={message} />}
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable
        buttonLabelFirstComponent="create new blog"
        buttonLabelSecondComponent="cancel"
        style={{ marginBottom: '5px' }}
        ref={togglableRef}
      >
        <></>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <Blogs
        blogs={blogs}
        updateBlog={updateBlog}
        removeBlog={removeBlog}
        user={user}
      />
    </div>
  )
}

export default App
