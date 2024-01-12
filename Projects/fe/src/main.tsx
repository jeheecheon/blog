import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import Home from '@Home/page/index'
import Error from '@common/components/Error';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route 
          index
          element={<Home/>}
          errorElement={<Error/>}
          />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
