import { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <>
      <div style={hideWhenVisible}>
        {blog.title}<button onClick={toggleVisibility}>view</button>
      </div>
      <div style={blogStyle}>
        <div>{blog.title}<button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes}</div>
        <div>{blog.author}</div>
      </div>
    </>
  )
}

export default Blog