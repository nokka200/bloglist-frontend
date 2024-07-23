import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog  from './components/CreateNewBlog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Blogin lisäystä varten
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    console.log('Getall Trigger')
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
    } catch (exception) {
      /*setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
      console.log('Virheiden virhe', exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear(); // Clear local storage
    setUser(null); // Update user state to null
  }

  // Hoitaa uuden blogin lisäyksen tietokantaan
  const handleNewBlog = (event) => {
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

    blogService.create(newBlog)
  }


  return (
    <div>
      {!user && <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword} />}
      
      

      {user && (
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          
          <CreateNewBlog
            handleNewBlog={handleNewBlog}
            blogTitle={blogTitle}
            blogAuthor={blogAuthor}
            blogUrl={blogUrl}
            setBlogTitle={setBlogTitle}
            setBlogAuthor={setBlogAuthor}
            setBlogUrl={setBlogUrl}
          />

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