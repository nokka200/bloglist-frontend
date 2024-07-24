import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/CreateNewBlog'
import SuccessMessage from './components/SuccessMessage'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  // Blogin lisäystä varten
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: 0
    }

    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')

    try {
      const savedBlog = await blogService.create(newBlog);

      setBlogs(currentBlogs => [...currentBlogs, savedBlog]);
      console.log('Saved blog', savedBlog);
      setSuccessMessage(true)
      setTimeout(() => {
        setSuccessMessage(false)
      }, 5000)
    } catch (error) {
      console.log('Error saving blog', error);

    }
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

          <Togglable buttonLabel='new note'>
            <CreateNewBlog
              handleNewBlog={handleNewBlog}
              blogTitle={blogTitle}
              blogAuthor={blogAuthor}
              blogUrl={blogUrl}
              setBlogTitle={setBlogTitle}
              setBlogAuthor={setBlogAuthor}
              setBlogUrl={setBlogUrl}
            />
          </Togglable>

          {blogs.map(blog => {
            const blogUser = blog.user ? blog.user : false;
            if (blogUser && blogUser.name === user.name) {
              return <Blog key={blog.id} blog={blog} />
            }
          })}
        </>
      )}

    </div>
  )
}

export default App