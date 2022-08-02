import * as React from 'react'
import '@reach/dialog/styles.css'
import {Dialog} from '@reach/dialog'
import {Logo} from './components/logo'
import {createRoot} from 'react-dom/client'

function LoginForm({onSubmit, buttonText}) {
  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  )
}

const App = () => {
  const [showLogin, setShowLogin] = React.useState(false)
  const openLogin = () => setShowLogin(true)
  const closeLogin = () => setShowLogin(false)

  const [showRegister, setShowRegister] = React.useState(false)
  const openRegister = () => setShowRegister(true)
  const closeRegister = () => setShowRegister(false)

  function login(formData) {
    console.log('login', formData)
  }

  function register(formData) {
    console.log('register', formData)
  }

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={openLogin}>Login</button>
      </div>
      <div>
        <button onClick={openRegister}>Register</button>
      </div>

      <Dialog aria-label="login form" isOpen={showLogin} onDismiss={closeLogin}>
        <button className="close-button" onClick={closeLogin}>
          <span aria-hidden>Close</span>
        </button>
        <h3>Login</h3>
        <LoginForm onSubmit={login} buttonText="Login" />
      </Dialog>

      <Dialog
        aria-label="register form"
        isOpen={showRegister}
        onDismiss={closeRegister}
      >
        <button className="close-button" onClick={closeRegister}>
          <span aria-hidden>Close</span>
        </button>
        <h3>Register</h3>
        <LoginForm onSubmit={register} buttonText="Register" />
      </Dialog>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
