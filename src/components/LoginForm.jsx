import React from 'react'
import ErrorMessage from './ErrorMessage'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword, errorMessage }) => {

  return (
    <div>
      <h2>Log in to application</h2>
      {errorMessage && <ErrorMessage />}
      <form onSubmit={handleLogin}>
        <div>
                    username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm