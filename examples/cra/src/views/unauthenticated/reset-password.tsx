import React from 'react'
import { Auth } from 'amplified'

import { AuthViewProps } from 'types/auth'

import AuthForm from 'components/auth-form'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const ResetPassword: React.FC<AuthViewProps> = ({ username, setAuthState }) => {
  const [resetPassword, resetPasswordState] = Auth.useForgotPasswordSubmit()
  const [code, setCode] = React.useState('')
  const [password, setPassword] = React.useState('')

  React.useEffect(() => {
    if (resetPasswordState.wasSuccessful) {
      setAuthState('sign-in', username)
    }
  }, [resetPasswordState.wasSuccessful, setAuthState, username])

  const handleSubmitForgotPasswordSubmit = React.useCallback(() => {
    resetPassword(username, code, password)
  }, [code, password, resetPassword, username])

  return (
    <AuthForm
      error={resetPasswordState.error?.message}
      onSubmit={handleSubmitForgotPasswordSubmit}
    >
      <Box mb={2}>
        <Typography color="textSecondary" align="center">
          Enter the verification code sent to your email.
        </Typography>
      </Box>

      <TextField
        fullWidth
        required
        variant="outlined"
        margin="normal"
        label="Code"
        type="number"
        disabled={resetPasswordState.isLoading}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <TextField
        fullWidth
        required
        variant="outlined"
        margin="normal"
        label="New Password"
        type="password"
        disabled={resetPasswordState.isLoading}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={resetPasswordState.isLoading}
        type="submit"
      >
        Reset Password
      </Button>
    </AuthForm>
  )
}

export default ResetPassword
