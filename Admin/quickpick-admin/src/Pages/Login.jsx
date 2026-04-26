import { LoginForm } from '@/components/login-form'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ setToken }) {
  const navigate = useNavigate()

  const handleLoginSuccess = (token) => {
    // store token in parent state and localStorage, then navigate to main dashboard route
    setToken(token)
    localStorage.setItem('token', token)
    navigate('/')
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onLogin={handleLoginSuccess} />
      </div>
    </div>
  )
}

export default Login