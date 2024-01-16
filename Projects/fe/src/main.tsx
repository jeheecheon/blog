import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import { Root } from '@root/page/index'
import { Error } from '@common/components/Error';
import { Blog } from '@blog/page/index';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Root />}
          errorElement={<Error />}
        />

        {/* Blog */}
        <Route
          path='/blog'
          element={<Blog />}
        >
          {/* Page that shows a subset of all posts using the pagination feature */}
          <Route
            path='posts'
          />

          {/* Page that shows a specific post content */}
          <Route
            path='post'
          />
          <Route
            path='upload-post'
          />
          <Route
            path='edit-post'
          />
          <Route
            path='about-me'
          />
        </Route>

        {/* Diary */}
        <Route
          path='diary'
        >
          {/* Page for writing an entry */}
          <Route
            path='upload-entry'
          />

          {/* Edit entry page */}
          <Route
            path='edit-entry'
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
