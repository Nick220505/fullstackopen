const _ = require('lodash')

const dummy = (blogs) => {
  return blogs.length + 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => (total += blog.likes), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  return blogs.reduce((favoriteBlog, blog) => {
    return blog.likes > favoriteBlog.likes ? blog : favoriteBlog
  })
}

const mostBlogs = (blogs) => {
  const blogCountsByAuthor = _.countBy(blogs, _.property('author'))
  const mostBlogsObj = {}
  _.forEach(blogCountsByAuthor, (blogs, author) => {
    if (!mostBlogsObj.blogs || blogs > mostBlogsObj.blogs) {
      mostBlogsObj.author = author
      mostBlogsObj.blogs = blogs
    }
  })
  return mostBlogsObj
}

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const mostLikesObj = {}
  _.forEach(blogsByAuthor, (blogs, author) => {
    const sumOfLikes = _.sumBy(blogs, 'likes')
    if (!mostLikesObj.likes || sumOfLikes > mostLikesObj.likes) {
      mostLikesObj.author = author
      mostLikesObj.likes = sumOfLikes
    }
  })
  return mostLikesObj
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
