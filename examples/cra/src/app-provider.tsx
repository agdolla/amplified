import React from 'react'
import { AmplifyProvider, Auth } from 'amplified'

import theme from 'config/theme'
import awsExports from 'aws-exports'

import { ThemeProvider, CssBaseline } from '@material-ui/core'

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Suspense fallback={<div>Loading</div>}>
        <AmplifyProvider enableSuspense config={awsExports}>
          <Auth.Provider>{children}</Auth.Provider>
        </AmplifyProvider>
      </React.Suspense>
    </ThemeProvider>
  )
}

export default AppProvider
