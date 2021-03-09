import React from 'react'

import Home from '../pages/Home'
import AdminHome from '../pages/AdminHome'


type Route = {
  to: string;
  Comp: any;
}


const routes: Route[] = [
  {
    to: "/",
    Comp: <Home />
  },
  {
    to: "/admin",
    Comp: <AdminHome />
  },
]


export default routes