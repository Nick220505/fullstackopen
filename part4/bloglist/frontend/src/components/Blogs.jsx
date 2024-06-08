import Blog from './Blog'

const Blogs = ({ user, blogs, handleLogout }) => {
  return (  
    <>
      <h2>blogs</h2>
      <p>
        {user} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )
}

export default Blogs