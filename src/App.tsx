import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import { Provider } from './components/Store'
import Header from './components/Header'
import routes from './utils/routes'

import './styles/index.sass'


class App extends React.Component {
  render = () =>
    <Provider>
      <div className="App">
        <Router>
          <Header />
          <div className="content">
            <div className="container">
              <Switch>
                {routes.map(route =>
                  <Route
                    path={route.link}
                    exact={route.link === "/"}
                  >
                    {route.comp}
                  </Route>
                )}
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    </Provider>
}


export default App
