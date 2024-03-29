import React from 'react'

const useIsMounted = () => {
  const mountedRef = React.useRef<boolean>(false)

  React.useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  return mountedRef
}

export default useIsMounted
