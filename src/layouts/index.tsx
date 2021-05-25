import React from 'react'

import { Provider } from '../components/Store'
import Helmet from '../components/Helmet'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import ScrollToTop from '../components/ScrollToTop'
import Loader from '../components/Loader'


const Layout = ({ children, location }) => 
  <Provider location={location}>
    <Loader />
    <div className="App">
      {/* <ScrollToTop> */}
        <Helmet />
        <Header />
        <div className="content">
          {children}
        </div>
        <Footer />
      {/* </ScrollToTop> */}
    </div>
  </Provider>


export default Layout
