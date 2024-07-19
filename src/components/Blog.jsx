const Blog = ({ blog }) => {
  const blogUser = blog.user ? blog.user : "";

  return (
    <div>
      {blog.title} {blog.author} {blogUser.name}
    </div>
  )
}

export default Blog