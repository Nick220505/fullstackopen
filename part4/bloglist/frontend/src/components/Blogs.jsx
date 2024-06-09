import Blog from './Blog'

const Blogs = ({ blogs, updateBlog, removeBlog, user }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          user={user}
        />
      )}
    </div>
  )
}

export default Blogs