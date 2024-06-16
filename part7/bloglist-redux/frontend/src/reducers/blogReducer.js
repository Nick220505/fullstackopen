import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push(action.payload)
    },
    setBlogs: (_, action) => action.payload,
    update: (state, action) => {
      const updatedBlog = action.payload
      return state.map((blog) => {
        if (blog.id === updatedBlog.id) {
          return updatedBlog
        }
        return blog
      })
    },
    remove: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload)
    },
    sortBlogsByLikes: (state) => {
      return state.sort((blogA, blogB) => blogB.likes - blogA.likes)
    },
  },
})

export const { add, setBlogs, update, remove, sortBlogsByLikes } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(add(newBlog))
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog)
    dispatch(update(updatedBlog))
    dispatch(sortBlogsByLikes())
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(remove(id))
  }
}

export default blogSlice.reducer
