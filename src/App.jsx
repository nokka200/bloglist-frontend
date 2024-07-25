import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/CreateNewBlog'
import SuccessMessage from './components/SuccessMessage'
import Togglable from './components/Toggable'
import MapBlogs from './components/MapBlogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [loading, setLoading] = useState(true)

  // Blogin lisäystä varten
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()  
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])



  // setBlogs(blogs.filter(blog => blog.user.username === user.username))

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(false)
    } catch (exception) {
      console.log('Virheiden virhe', exception)
      setErrorMessage(true)
      setTimeout(() => {
        setErrorMessage(false)
      }, 2000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear(); // Clear local storage
    setUser(null); // Update user state to null
  }

  // Hoitaa uuden blogin lisäyksen tietokantaan
  const handleNewBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: 0
    }


    const savedBlog = await blogService.create(newBlog);
    setBlogs(currentBlogs => [...currentBlogs, savedBlog]);
    console.log('Saved blog', savedBlog);


    setSuccessMessage(true)
    setTimeout(() => {
      setSuccessMessage(false)
    }, 5000)
    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')

  }

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    const savedBlog = await blogService.create(blog);
    setBlogs(currentBlogs => [...currentBlogs, savedBlog]);

    setBlogTitle(blog.title)
    setBlogAuthor(blog.author)

    setSuccessMessage(true)
    setTimeout(() => {
      setSuccessMessage(false)
    }, 5000)

  }

  const updateBlog = async (id, blog) => {
    const updatedBlog = await blogService.updateLikes(id, blog)
    console.log('updatedBlog', updatedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    console.log('blogs', blogs)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {!user && <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        errorMessage={errorMessage}
      />}



      {user && (
        <>
          <h2>blogs</h2>
          {successMessage && <SuccessMessage title={blogTitle} author={blogAuthor} />}
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

          <Togglable buttonLabel='new note' ref={blogFormRef}>
            <CreateNewBlog
              createBlog={addBlog}
            />
          </Togglable>
          
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => {
              return <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
            })}
            
        </>
      )}
    </div>
  )
}

export default App


{/* tämä map aiheuttaa ongelmat, miksi ei päivity kunnolla 

          {blogs.map(blog => {
            const blogUser = blog.user ? blog.user : false;
            if (blogUser && blogUser.name === user.name) {
              console.log('rerender blogs')
              return <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
            }
          })}
          {blogs.map(blog => {
            console.log('blogs', blog.user.username)
            console.log('user', user.username)
            return <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          })}*/}