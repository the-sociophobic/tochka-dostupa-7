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
import Template from '../pages/Program/Template'
import Redirect from '../components/Redirect'
import Error404 from '../components/Error404'


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
    exact: true,
    to: '/program/main',
    Comp: <Template programId='7fOwCkT7nOXh3C81toLoSs' />
  },
  {
    exact: true,
    to: '/program/open',
    Comp: <Template programId='4qgsLo90by1TfShZwdyNhw' />
  },
  {
    exact: true,
    to: '/program/educational',
    Comp: <Template programId='6OfzgvjCzzT1xhlwDH2AfQ' />
  },
  {
    exact: true,
    to: '/program/friends',
    Comp: <Template programId='4NkckPWZ7vHmJtzrwwoERP' />
  },
  {
    to: '/program/main/text',
    Comp: <Template text programId='7fOwCkT7nOXh3C81toLoSs' />
  },
  {
    to: '/program/main/text2',
    Comp: <Template text2 programId='7fOwCkT7nOXh3C81toLoSs' />
  },
  {
    to: '/program/open/text',
    Comp: <Template text programId='4qgsLo90by1TfShZwdyNhw' />
  },
  {
    to: '/program/educational/text',
    Comp: <Template text programId='6OfzgvjCzzT1xhlwDH2AfQ' />
  },

  {
    to: "/privacy",
    Comp: <Redirect to='https://special.tochkadostupa.spb.ru/policy' />
  },
  {
    to: "/details",
    Comp: <Redirect to='https://drive.google.com/file/d/1fHCRWr5t_DEUVkrQOFug3i7evZS1GV1r/view ' />
  },

  {
    to: "/",
    Comp: <Error404 />
  },
]


export default routes