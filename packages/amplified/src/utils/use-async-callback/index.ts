import React from 'react'

import useIsMounted from '../use-is-mounted'
import { AnyPromise, Unwrap, State } from './types'
import createReducer from './reducer'

const useAsyncCallback = <Cb extends AnyPromise, Result = Unwrap<Cb>>(
  cb: Cb
): [Cb, State<Result>] => {
  const isMounted = useIsMounted()

  const [state, dispatch] = React.useReducer(createReducer<Result>(), {
    isLoading: false,
    result: null,
    error: null,
    wasSuccessful: false,
  })

  const exec = React.useCallback(
    async (...args: Parameters<Cb>) => {
      try {
        dispatch({ type: 'start' })
        const result = await cb(...args)
        if (isMounted.current) dispatch({ type: 'succeed', payload: result })
        return result
      } catch (error) {
        if (isMounted.current) dispatch({ type: 'fail', payload: error })
        return undefined
      }
    },
    [cb, isMounted]
  ) as Cb

  return [exec, state]
}

export default useAsyncCallback
