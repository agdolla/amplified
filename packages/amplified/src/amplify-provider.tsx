import React from 'react'
import Amplify from 'aws-amplify'
import { SWRConfig } from 'swr'

type AmplifyProviderProps = {
  enableSuspense?: boolean
  config: object
}

const AmplifyProvider: React.FC<AmplifyProviderProps> = ({
  enableSuspense = false,
  config,
  children,
}) => {
  const isFirstRender = React.useRef(true)

  if (isFirstRender.current) {
    Amplify.configure(config)
  }

  React.useEffect(() => {
    isFirstRender.current = false
  }, [])

  return <SWRConfig value={{ suspense: enableSuspense }}>{children}</SWRConfig>
}

export default AmplifyProvider
