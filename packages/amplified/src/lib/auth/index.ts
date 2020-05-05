import { Auth } from 'aws-amplify'

import CurrentUserContext from './current-user-context'
import useAsyncCallback from '../../utils/use-async-callback'

export const { Provider } = CurrentUserContext

export const useCurrentUser = () => {
  return CurrentUserContext.useContainer()
}

export const useSignIn = () => {
  return useAsyncCallback(Auth.signIn.bind(Auth))
}

export const useSignOut = () => {
  return useAsyncCallback(Auth.signOut.bind(Auth))
}

export const useSignUp = () => {
  return useAsyncCallback(Auth.signUp.bind(Auth))
}

export const useConfirmSignUp = () => {
  return useAsyncCallback(Auth.confirmSignUp.bind(Auth))
}

export const useForgotPassword = () => {
  return useAsyncCallback(Auth.forgotPassword.bind(Auth))
}

export const useForgotPasswordSubmit = () => {
  return useAsyncCallback(Auth.forgotPasswordSubmit.bind(Auth))
}
