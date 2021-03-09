import React from 'react'

import Home from '../pages/Home'
import AdminHome from '../pages/AdminHome'


type Route = {
  label: string,
  link: string;
  comp: any;
}


const routes: Route[] = [
  {
    label: "Home",
    link: "/",
    comp: <Home />
  },
  {
    label: "AdminHome",
    link: "/admin",
    comp: <AdminHome />
  },
]


export default routes