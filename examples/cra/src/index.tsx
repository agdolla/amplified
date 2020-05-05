import React from 'react'
import ReactDOM from 'react-dom'

import AppProvider from 'app-provider'
import App from 'app'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
