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
                    key={route.to}
                    path={route.to}
                    exact={route.to === "/"}
                  >
                    {route.Comp}
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
