import React from 'react'
import { Auth } from 'amplified'

import { AuthViewProps } from 'types/auth'

import AuthForm from 'components/auth-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

const ForgotPassword: React.FC<AuthViewProps> = ({ setAuthState }) => {
  const [forgotPassword, forgotPasswordState] = Auth.useForgotPassword()
  const [username, setUsername] = React.useState('')

  React.useEffect(() => {
    if (forgotPasswordState.wasSuccessful) {
      setAuthState('reset-password', username)
    }
  }, [forgotPasswordState.wasSuccessful, setAuthState, username])

  const handleForgotPassword = React.useCallback(() => {
    forgotPassword(username)
  }, [forgotPassword, username])

  const handleSignIn = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      setAuthState('sign-in')
    },
    [setAuthState]
  )

  return (
    <AuthForm
      error={forgotPasswordState.error?.message}
      onSubmit={handleForgotPassword}
    >
      <TextField
        fullWidth
        required
        variant="outlined"
        margin="normal"
        label="Username"
        type="text"
        disabled={forgotPasswordState.isLoading}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={forgotPasswordState.isLoading}
        type="submit"
      >
        Forgot Password
      </Button>
      <Box display="flex" justifyContent="center">
        <Link href="#" variant="body2" onClick={handleSignIn}>
          Sign In
        </Link>
      </Box>
    </AuthForm>
  )
}

export default ForgotPassword
