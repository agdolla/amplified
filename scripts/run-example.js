/* eslint-disable @typescript-eslint/no-var-requires, no-console */
const { spawnSync } = require('child_process')

const [, , example, ...args] = process.argv
const pkgName = example && `${example}-example`

if (!pkgName) {
  console.error('Please pass an example to run.')
  process.exit(1)
}

if (args[0] === 'dev') {
  console.log(`Prebuilding dependencies of ${pkgName}...`)

  const dependents = spawnSync(
    'yarn',
    ['-s', 'lerna', 'ls', '--scope', pkgName, '--include-dependencies'],
    { stdio: 'pipe', encoding: 'utf-8' }
  )

  const scopes = dependents.stdout
    .trim()
    .split(' ')
    .map((pkg) => ['--scope', pkg])
    .flat()

  spawnSync(
    'yarn',
    ['lerna', 'run', 'build', ...scopes, '--include-dependencies', '--stream'],
    { stdio: 'ignore' }
  )

  spawnSync(
    'yarn',
    [
      'lerna',
      'run',
      'dev',
      '--scope',
      pkgName,
      '--include-dependencies',
      '--parallel',
      '--stream',
    ],
    { stdio: 'inherit' }
  )
} else {
  spawnSync('yarn', ['workspace', pkgName, ...args], {
    stdio: 'inherit',
  })
}
