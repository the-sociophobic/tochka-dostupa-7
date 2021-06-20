import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
// import ReactDOM from 'react-dom'
import { render } from 'react-snapshot'
import ReactPixel from 'react-facebook-pixel'

import App from './App'


ReactPixel.init('1860785940893852')
ReactPixel.pageView()
ReactPixel.fbq('track', 'PageView')


// ReactDOM.render(
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)