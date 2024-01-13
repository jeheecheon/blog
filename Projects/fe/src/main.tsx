import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import Root from '@root/page/index'
import Error from '@common/components/Error';
import './index.css'
import Blog from 'pages/blog/page';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Root />}
          errorElement={<Error />}
        >
          <Route
            path='/blog'
            element={<Blog />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
