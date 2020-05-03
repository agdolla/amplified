# 🎣 Amplified

[AWS Amplify](https://docs.amplify.aws/) libraries wrapped with React hooks.

## Getting started

1. Install

```sh
yarn add amplified
```

2. Wrap your application with `<AmplifyProvider />`

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { AmplifyProvider } from "amplified";

import awsExports from "./aws-exports";
import App from "./app";

ReactDOM.render(
  <React.StrictMode>
    <AmplifyProvider config={awsExports}>
      <App />
    </AmplifyProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Libraries](#libraries)
  - [Auth](#auth)
    - [`<Auth.Provider />`](#authprovider-)
    - [`Auth.useCurrentUser(): CognitoUser | null`](#authusecurrentuser-cognitouser--null)
    - [`Auth.useSignIn(): [signIn, signInState]`](#authusesignin-signin-signinstate)
    - [`Auth.useSignOut(): [signOut, signOutState]`](#authusesignout-signout-signoutstate)
    - [`Auth.useSignUp(): [signUp, signUpState]`](#authusesignup-signup-signupstate)
    - [`Auth.useConfirmSignUp(): [confirmSignUp, confirmSignUpState]`](#authuseconfirmsignup-confirmsignup-confirmsignupstate)
    - [`Auth.useForgotPassword(): [forgotPassword, forgotPasswordState]`](#authuseforgotpassword-forgotpassword-forgotpasswordstate)
    - [`Auth.useForgotPasswordSubmit(): [forgotPasswordSubmit, forgotPasswordSubmitState]`](#authuseforgotpasswordsubmit-forgotpasswordsubmit-forgotpasswordsubmitstate)
- [Concepts](#concepts)
  - [Data fetching techniques](#data-fetching-techniques)
    - [Enabling Suspense](#enabling-suspense)
  - [Async callbacks](#async-callbacks)
- [Contributors](#contributors)
- [Contributing](#contributing)
- [Release](#release)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Libraries

### Auth

#### `<Auth.Provider />`

If your are using authentication features in your app, wrap it with `<Auth.Provider />` in order to react to authentication state changes.

Uses [data fetching techniques](#data-fetching-techniques) to asynchronously get the current user.

**Usage**

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { AmplifyProvider, Auth } from "amplified";

import awsExports from "./aws-exports";
import App from "./app";

ReactDOM.render(
  <React.StrictMode>
    <AmplifyProvider config={awsExports}>
      <Auth.Provider>
        <App />
      </Auth.Provider>
    </AmplifyProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

#### `Auth.useCurrentUser(): CognitoUser | null`

Returns the current authenticated user, if any. Its value changes automatically according to the current authentication state.

> ⚠️ Your app must be wrapped with `<Auth.Provider />` or you will get an error if you try to `useCurrentUser`.

**Usage**

```tsx
import React from "react";
import { Auth } from "amplified";

import Authenticated from "views/authenticated";
import Unauthenticated from "views/unauthenticated";

const App: React.FC = () => {
  const currentUser = Auth.useCurrentUser();

  return currentUser ? (
    <div>Hola, {currentUser.getUsername()}</div>
  ) : (
    <div>Please sign in!</div>
  );
};

export default App;
```

#### `Auth.useSignIn(): [signIn, signInState]`

Returns an [async callback](#async-callbacks) around [Auth.signIn](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#signin).

**Usage**

```tsx
import React from "react";
import { Auth } from "amplified";

const SignIn: React.FC = () => {
  const [signIn, signInState] = Auth.useSignIn();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (signInState.wasSuccessful) {
      alert("Successfully signed in");
    }
  }, [signInState.wasSuccessful]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {signInState.error ? <div>{signInState.error.message}</div> : null}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit" disabled={signInState.isLoading}>
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
```

#### `Auth.useSignOut(): [signOut, signOutState]`

Returns an [async callback](#async-callbacks) around [Auth.signOut](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#signout).

**Usage**

```tsx
import React from "react";
import { Auth } from "amplified";

const Authenticated: React.FC = () => {
  const currentUser = Auth.useCurrentUser();
  const [submitSignOut, signOut] = Auth.useSignOut();

  return (
    <div>
      <h1>{currentUser?.getUsername()}</h1>
      <button
        type="button"
        disabled={signOut.isLoading}
        onClick={() => submitSignOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Authenticated;
```

#### `Auth.useSignUp(): [signUp, signUpState]`

Returns an [async callback](#async-callbacks) around [Auth.signUp](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#signup).

**Usage**

```tsx
import React from "react";
import { Auth } from "amplified";

const SignUp: React.FC = () => {
  const [signUp, signUpState] = Auth.useSignUp();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (signUpState.wasSuccessful) {
      alert("Successfully signed up");
    }
  }, [signUpState.wasSuccessful]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp({ username, password, attributes: { email } });
  };

  return (
    <form onSubmit={handleSubmit}>
      {signUpState.error ? <div>{signUpState.error.message}</div> : null}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit" disabled={signUpState.isLoading}>
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
```

#### `Auth.useConfirmSignUp(): [confirmSignUp, confirmSignUpState]`

Returns an [async callback](#async-callbacks) around [Auth.confirmSignUp](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#confirmsignup).

**Usage**

```tsx
import React from "react";
import { Auth } from "amplified";

const ConfirmSignUp: React.FC = () => {
  const [confirmSignUp, confirmSignUpState] = Auth.useConfirmSignUp();
  const [username, setUsername] = React.useState("");
  const [code, setCode] = React.useState("");

  React.useEffect(() => {
    if (confirmSignUpState.wasSuccessful) {
      alert("Account confirmed");
    }
  }, [confirmSignUpState.wasSuccessful]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confirmSignUp(username, code);
  };

  return (
    <form onSubmit={handleSubmit}>
      {confirmSignUpState.error ? (
        <div>{confirmSignUpState.error.message}</div>
      ) : null}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Code"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <button type="submit" disabled={confirmSignUpState.isLoading}>
        Confirm Sign Up
      </button>
    </form>
  );
};

export default ConfirmSignUp;
```

#### `Auth.useForgotPassword(): [forgotPassword, forgotPasswordState]`

Returns an [async callback](#async-callbacks) around [Auth.forgotPassword](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#forgotpassword).

**Usage**

```tsx
import React from "react";
import { Auth } from "amplified";

const ForgotPassword: React.FC = () => {
  const [forgotPassword, forgotPasswordState] = Auth.useForgotPassword();
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    if (forgotPasswordState.wasSuccessful) {
      alert("Verification code sent");
    }
  }, [forgotPasswordState.wasSuccessful]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      {forgotPasswordState.error ? (
        <div>{forgotPasswordState.error.message}</div>
      ) : null}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button type="submit" disabled={forgotPasswordState.isLoading}>
        Send verification code
      </button>
    </form>
  );
};

export default ForgotPassword;
```

#### `Auth.useForgotPasswordSubmit(): [forgotPasswordSubmit, forgotPasswordSubmitState]`

Returns an [async callback](#async-callbacks) around [Auth.forgotPasswordSubmit](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#forgotpasswordsubmit).

**Usage**

```tsx
import React from "react";
import { Auth } from "amplified";

const ResetPassword: React.FC = () => {
  const [resetPassword, resetPasswordState] = Auth.useForgotPasswordSubmit();
  const [username, setUsername] = React.useState("");
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (resetPasswordState.wasSuccessful) {
      alert("Password successfuly changed");
    }
  }, [resetPasswordState.wasSuccessful]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetPassword(username, code, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {resetPasswordState.error ? (
        <div>{resetPasswordState.error.message}</div>
      ) : null}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Code"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit" disabled={resetPasswordState.isLoading}>
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
```

## Concepts

### Data fetching techniques

All remote data fetching happens through [SWR](https://swr.now.sh), a library created by the [Vercel](https://vercel.com) team that uses advanced cache invalidation strategies.

#### Enabling Suspense

You can enable [Suspense for Data Fetching](https://reactjs.org/docs/concurrent-mode-suspense.html) by passing `enableSuspense` prop to `<AmplifyProvider />`.

**Example**

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { AmplifyProvider } from "amplified";

import awsExports from "./aws-exports";
import App from "./app";

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading</div>}>
      <AmplifyProvider enableSuspense config={awsExports}>
        <App />
      </AmplifyProvider>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
```

### Async callbacks

An async callback is a hook that receives a promise as an argument and returns an array containing two items: the wrapped promise and an execution state object that contains:

1. `isLoading`: a boolean indicating if the promise is executing
2. `result`: result value from the promise, if it succeeded
3. `error`: error thrown from the promise, if it failed
4. `wasSuccessful`: a boolean indicating if the promise execution was successful

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kevinwolf.dev"><img src="https://avatars2.githubusercontent.com/u/3157426?v=4" width="100px;" alt=""/><br /><sub><b>Kevin Wolf</b></sub></a><br /><a href="https://github.com/kevinwolfdev/amplified/commits?author=kevinwolfdev" title="Documentation">📖</a> <a href="https://github.com/kevinwolfdev/amplified/commits?author=kevinwolfdev" title="Code">💻</a> <a href="#infra-kevinwolfdev" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## Contributing

If you have any question, suggestion or recommendation, please [open an issue](issues/new) about it.

If you decided you want to introduce something to the project, please read [contribution guidelines](./CONTRIBUTING.md) first.

## Release

All the release process is automated and managed by the awesome package [auto](https://github.com/intuit/auto).

## License

[MIT](/LICENSE)
