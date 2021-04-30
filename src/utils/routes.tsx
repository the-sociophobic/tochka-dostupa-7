import React from 'react'

import Home from '../pages/Home'
import Login from '../pages/Login'

import Admin from '../pages/User/Admin'
import Tickets from '../pages/User/Tickets'
import Settings from '../pages/User/Settings'

import Schedule from '../pages/Schedule'

import Projects from '../pages/Festival/Projects'
import Reviews from '../pages/Festival/Reviews'
import About from '../pages/Festival/About'
import QandA from '../pages/Festival/QandA'
import Accreditation from '../pages/Festival/Accreditation'
import Archive from '../pages/Festival/Archive'
import Contacts from '../pages/Festival/Contacts'

import Spekt from '../pages/Spekt'

import Main from '../pages/Program/Main'
import Open from '../pages/Program/Open'
import Educational from '../pages/Program/Educational'


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
    to: "/festival/about/projects",
    Comp: <Projects />
  },
  {
    to: "/festival/about/reviews",
    Comp: <Reviews />
  },
  {
    to: "/festival/about",
    Comp: <About />
  },
  {
    to: "/festival/Q&A",
    Comp: <QandA />
  },
  {
    to: "/festival/accreditation",
    Comp: <Accreditation />
  },
  {
    to: "/festival/archive",
    Comp: <Archive />
  },
  {
    to: "/festival/contacts",
    Comp: <Contacts />
  },

  {
    to: '/spekt',
    Comp: <Spekt />
  },

  {
    to: '/program/main',
    Comp: <Main />
  },
  {
    to: '/program/open',
    Comp: <Open />
  },
  {
    to: '/program/educational',
    Comp: <Educational />
  },
]


export default routes