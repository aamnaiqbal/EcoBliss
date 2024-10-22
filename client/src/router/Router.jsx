import React from 'react'
import {createBrowserRouter } from 'react-router-dom'

import App from "../App"
import Home from "../pages/home/Home"
import OutdoorPlant from '../pages/categories/OutdoorPlant';
import PlantDetails from '../components/PlantDetails';
import OrchidPlant from '../pages/categories/OrchidPlant';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/outdoorplants',
          element: <OutdoorPlant/>
        },
        {
          path: '/orchidplants',
          element: <OrchidPlant/>
        },
        {
          path: '/plant/:id',
          element: <PlantDetails/>
        }
      ]
    },
  ]);



export default router;