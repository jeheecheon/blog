import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import { Root } from '@/pages/root/page/index'
import { Error } from '@/common/components/Error';
import { Blog } from '@/pages/blog/page/index';
import { Posts } from '@/pages/blog/posts/page/index';
import './main.css'
import { Post } from '@/pages/blog/post/page/index';

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
            element={<Posts />}
          />

          {/* Page that shows a specific post content */}
          <Route
            path='post'
            element={<Post />}
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
