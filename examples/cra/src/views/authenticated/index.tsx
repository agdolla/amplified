import React from 'react'
import { Auth } from 'amplified'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Authenticated: React.FC = () => {
  const currentUser = Auth.useCurrentUser()
  const [submitSignOut, signOut] = Auth.useSignOut()

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h6" component="h1" align="center">
        {currentUser?.getUsername()}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        disabled={signOut.isLoading}
        onClick={() => submitSignOut()}
      >
        Sign Out
      </Button>
    </Box>
  )
}

export default Authenticated
