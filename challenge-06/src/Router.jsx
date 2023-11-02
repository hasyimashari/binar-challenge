import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import LandingPage from './view/LandingPage'
import SearchCarPage from './view/SearchCarPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage/>
  },
  {
    path: '/cars',
    element: <SearchCarPage/>
  }
])

export default router
