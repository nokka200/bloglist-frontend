import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? '' : 'none'
  }

  const updateLikes = async () => { 
    const updatedBlog = {
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      author: blog.author
    }

    await updateBlog(blog.id, updatedBlog)
  }

  const removeBlog = async () => { 
    await deleteBlog(blog.id)
  }

  return (
    <>
      <div style={hideWhenVisible}>
        {blog.title}<button onClick={toggleVisibility}>view</button>
      </div>
      <div style={blogStyle}>
        <div>{blog.title}<button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={updateLikes}>like</button></div>
        <div>{blog.author}</div>
        <div><button onClick={removeBlog}>remove</button></div>
      </div>
    </>
  )
}

export default Blog