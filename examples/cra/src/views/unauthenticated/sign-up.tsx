import React from 'react'
import { Auth } from 'amplified'

import { AuthViewProps } from 'types/auth'

import AuthForm from 'components/auth-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

const SignUp: React.FC<AuthViewProps> = ({ setAuthState }) => {
  const [signUp, signUpState] = Auth.useSignUp()
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  React.useEffect(() => {
    if (signUpState.wasSuccessful) {
      setAuthState('confirm-sign-up', username)
    }
  }, [setAuthState, signUpState.wasSuccessful, username])

  const handleSignUp = React.useCallback(() => {
    signUp({
      username,
      password,
      attributes: { email },
    })
  }, [email, password, signUp, username])

  const handleSignIn = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      setAuthState('sign-in')
    },
    [setAuthState]
  )

  return (
    <AuthForm error={signUpState.error?.message} onSubmit={handleSignUp}>
      <TextField
        fullWidth
        required
        variant="outlined"
        margin="normal"
        label="Username"
        type="text"
        disabled={signUpState.isLoading}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        required
        variant="outlined"
        margin="normal"
        label="Email"
        type="email"
        disabled={signUpState.isLoading}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        required
        variant="outlined"
        margin="normal"
        label="Password"
        type="password"
        disabled={signUpState.isLoading}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={signUpState.isLoading}
        type="submit"
      >
        Sign Up
      </Button>
      <Box display="flex" justifyContent="center">
        <Link href="#" variant="body2" onClick={handleSignIn}>
          Sign In
        </Link>
      </Box>
    </AuthForm>
  )
}

export default SignUp
