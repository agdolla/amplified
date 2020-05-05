import React from 'react'
import { Auth } from 'amplified'

import { AuthViewProps } from 'types/auth'

import AuthForm from 'components/auth-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

const SignIn: React.FC<AuthViewProps> = ({ username: user, setAuthState }) => {
  const [signIn, signInState] = Auth.useSignIn()
  const [username, setUsername] = React.useState(user)
  const [password, setPassword] = React.useState('')

  React.useEffect(() => {
    if (signInState.error?.code === 'UserNotConfirmedException') {
      setAuthState('confirm-sign-up', username)
    }
  }, [setAuthState, signInState.error, username])

  const handleSignIn = React.useCallback(() => {
    signIn(username, password)
  }, [password, signIn, username])

  const handleForgotPassword = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      setAuthState('forgot-password')
    },
    [setAuthState]
  )

  const handleSignUp = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      setAuthState('sign-up')
    },
    [setAuthState]
  )

  return (
    <AuthForm error={signInState.error?.message} onSubmit={handleSignIn}>
      <TextField
        fullWidth
        required
        variant="outlined"
        margin="normal"
        label="Username"
        type="text"
        disabled={signInState.isLoading}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        required
        variant="outlined"
        margin="normal"
        label="Password"
        type="password"
        disabled={signInState.isLoading}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={signInState.isLoading}
        type="submit"
      >
        Sign In
      </Button>
      <Box display="flex" justifyContent="space-between">
        <Link href="#" variant="body2" onClick={handleForgotPassword}>
          Forgot password?
        </Link>
        <Link href="#" variant="body2" onClick={handleSignUp}>
          Sign Up
        </Link>
      </Box>
    </AuthForm>
  )
}

export default SignIn
