import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import LandingPage from './view/LandingPage'
import SearchCarPage from './view/SearchCarPage'
import PageLayout from './layout/PageLayout'

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/cars',
        element: <SearchCarPage/>
      }
    ]
  }
])

export default router
