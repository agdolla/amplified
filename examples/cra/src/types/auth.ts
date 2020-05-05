export type AuthView =
  | 'sign-in'
  | 'sign-up'
  | 'confirm-sign-up'
  | 'forgot-password'
  | 'reset-password'

export type AuthState = {
  view: AuthView
  username: string
}

export type AuthViewProps = {
  username: string
  setAuthState: (view: AuthView, username?: string) => void
}

export type AuthViews = Record<
  AuthView,
  React.LazyExoticComponent<React.FC<AuthViewProps>>
>
