import React from 'react'
import { Auth } from 'amplified'

import Authenticated from 'views/authenticated'
import Unauthenticated from 'views/unauthenticated'

const App: React.FC = () => {
  const currentUser = Auth.useCurrentUser()

  return currentUser ? <Authenticated /> : <Unauthenticated />
}

export default App
