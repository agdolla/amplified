import React from 'react'
import { Auth } from 'amplified'

import { AuthViewProps } from 'types/auth'

import AuthForm from 'components/auth-form'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const ConfirmSignUp: React.FC<AuthViewProps> = ({ username, setAuthState }) => {
  const [confirmSignUp, confirmSignUpState] = Auth.useConfirmSignUp()
  const [code, setCode] = React.useState('')

  React.useEffect(() => {
    if (confirmSignUpState.wasSuccessful) {
      setAuthState('sign-in', username)
    }
  }, [confirmSignUpState.wasSuccessful, setAuthState, username])

  const handleConfirmSignUp = React.useCallback(() => {
    confirmSignUp(username, code)
  }, [code, confirmSignUp, username])

  return (
    <AuthForm
      error={confirmSignUpState.error?.message}
      onSubmit={handleConfirmSignUp}
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
        disabled={confirmSignUpState.isLoading}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={confirmSignUpState.isLoading}
        type="submit"
      >
        Verify
      </Button>
    </AuthForm>
  )
}

export default ConfirmSignUp
