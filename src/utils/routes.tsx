import React from 'react'

import Home from '../pages/Home'


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
]


export default routes