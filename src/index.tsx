import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
// import ReactDOM from 'react-dom'
import { render } from 'react-snapshot'

import App from './App'


// ReactDOM.render(
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)