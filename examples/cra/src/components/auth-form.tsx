import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

type AuthFormProps = {
  error?: string
  onSubmit: () => void
}

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiButton-root': {
      margin: theme.spacing(3, 0, 2),
    },
  },
}))

const AuthForm: React.FC<AuthFormProps> = ({ error, onSubmit, children }) => {
  const styles = useStyles()

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit()
    },
    [onSubmit]
  )

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {error ? (
        <Typography variant="subtitle2" color="error" align="center">
          {error}
        </Typography>
      ) : null}

      <Box
        className={styles.form}
        mt={error ? 4 : 0}
        display="flex"
        flexDirection="column"
        alignSelf="stretch"
        component="form"
        onSubmit={handleSubmit}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AuthForm
