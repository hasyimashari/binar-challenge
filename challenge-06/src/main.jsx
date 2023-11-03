import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import './index.css'
import router from './Router'
import CarContextProvider from './context/CarContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarContextProvider>
      <RouterProvider router={router}/>
    </CarContextProvider>
  </React.StrictMode>,
)
