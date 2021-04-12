import React from 'react'

import Home from '../pages/Home'
import Login from '../pages/Login'

import Admin from '../pages/User/Admin'
import Tickets from '../pages/User/Tickets'
import Settings from '../pages/User/Settings'

import Schedule from '../pages/Schedule'

import Archive from '../pages/Festival/Archive'

import Spekt from '../pages/Spekt'


type Route = {
  to: string
  Comp: any
  exact?: boolean
}


const routes: Route[] = [
  {
    exact: true,
    to: "/",
    Comp: <Home />
  },
  {
    to: "/login",
    Comp: <Login />
  },
  
  {
    to: "/user/tickets",
    Comp: <Tickets />
  },
  {
    to: "/user/settings",
    Comp: <Settings />
  },
  {
    to: "/user/admin",
    Comp: <Admin />
  },

  {
    to: "/schedule",
    Comp: <Schedule />
  },

  {
    to: "/festival/archive",
    Comp: <Archive />
  },

  {
    to: '/spekt',
    Comp: <Spekt />
  },
]


export default routes