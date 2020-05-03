# 🎣 Amplified

[AWS Amplify](https://docs.amplify.aws/) libraries wrapped with React hooks.

## Getting started

1. Install

```sh
yarn add amplified
```

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Libraries](#libraries)
- [Concepts](#concepts)
  - [Data fetching techniques](#data-fetching-techniques)
  - [Async callbacks](#async-callbacks)
- [Contributors](#contributors)
- [Contributing](#contributing)
- [Release](#release)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Libraries

N/A

## Concepts

### Data fetching techniques

All remote data fetching happens through [SWR](https://swr.now.sh), a library created by the [Vercel](https://vercel.com) team that uses advanced cache invalidation strategies.

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
