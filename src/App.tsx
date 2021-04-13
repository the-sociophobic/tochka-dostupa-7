import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import { Provider } from './components/Store'
import Helmet from './components/Helmet'
import Header from './components/Header'
import Footer from './components/Footer'
import routes from './utils/routes'
import ScrollToTop from './components/ScrollToTop'

import './styles/index.sass'


class App extends React.Component {
  
  render = () =>
    <Provider>
      <div className="App">
        <Router>
          <ScrollToTop>
            <Helmet />
            <Header />
            <div className="content">
              <Switch>
                {routes.map(route =>
                  <Route
                    key={route.to}
                    path={route.to}
                    exact={route.exact}
                  >
                    {route.Comp}
                  </Route>
                )}
              </Switch>
            </div>
            <Footer />
          </ScrollToTop>
        </Router>
      </div>
    </Provider>
}


export default App
