import React from 'react'

import { AuthView, AuthViews, AuthState } from 'types/auth'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const authViews: AuthViews = {
  'sign-in': React.lazy(() => import('./sign-in')),
  'sign-up': React.lazy(() => import('./sign-up')),
  'confirm-sign-up': React.lazy(() => import('./confirm-sign-up')),
  'forgot-password': React.lazy(() => import('./forgot-password')),
  'reset-password': React.lazy(() => import('./reset-password')),
}

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
  },
}))

const Unauthenticated: React.FC = () => {
  const [authState, setAuthState] = React.useState<AuthState>({
    view: 'sign-in',
    username: '',
  })
  const styles = useStyles()

  const handleAuthStateChange = React.useCallback(
    (view: AuthView, username = '') => {
      setAuthState({ view, username })
    },
    []
  )

  const CurrentView = React.useMemo(() => authViews[authState.view], [
    authState.view,
  ])

  return (
    <Container component="main" maxWidth="xs" className={styles.container}>
      <CurrentView
        username={authState.username}
        setAuthState={handleAuthStateChange}
      />
    </Container>
  )
}

export default Unauthenticated
