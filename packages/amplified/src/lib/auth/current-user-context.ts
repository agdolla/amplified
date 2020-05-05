import React from 'react'
import useSWR from 'swr'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { Auth, Hub } from 'aws-amplify'
import { HubCallback } from '@aws-amplify/core/lib/Hub'

import createContainer from '../../utils/create-container'

const CurrentUserContext = createContainer(() => {
  const { data, mutate } = useSWR<CognitoUser | null>(
    'currentUser',
    async () => {
      try {
        const user = await Auth.currentAuthenticatedUser({ bypassCache: false })
        return user instanceof CognitoUser ? user : null
      } catch (err) {
        return null
      }
    }
  )

  React.useEffect(() => {
    const handleAuthChange: HubCallback = ({ payload }) => {
      if (payload.event === 'signIn') {
        mutate(payload.data)
      } else if (payload.event === 'signOut') {
        mutate(null)
      }
    }

    Hub.listen('auth', handleAuthChange)
    return () => Hub.remove('auth', handleAuthChange)
  }, [mutate])

  return data
}, 'Wrap your application with <Auth.Provider /> in order to useCurrentUser()')

export default CurrentUserContext
