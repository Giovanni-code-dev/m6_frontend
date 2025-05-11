import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../utils/api"

import GoogleLoginButton from './GoogleLoginButton';

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await loginUser(email, password)
      navigate("/")
    } catch (err) {
      setError(err.message)
    }
  }

  const handleLoginSuccess = (token) => {
    navigate("/")
  };

  const handleLoginError = (msg) => {
    console.error("Login error:", msg);
    setError(msg);
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="d-flex align-items-center">
        <button type="submit" className="btn btn-primary me-2">
          Accedi
        </button>

        <GoogleLoginButton
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
        </div>


      </form>
    </div>
  )
}

export default LoginForm
