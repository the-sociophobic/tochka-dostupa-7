import React from 'react'

import Home from '../pages/Home'
import Schedule from '../pages/Schedule'
import AdminHome from '../pages/AdminHome'
import Login from '../pages/Login'


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
    to: "/admin",
    Comp: <AdminHome />
  },
  {
    to: "/login",
    Comp: <Login />
  },
  {
    to: "/schedule",
    Comp: <Schedule />
  },
]


export default routes