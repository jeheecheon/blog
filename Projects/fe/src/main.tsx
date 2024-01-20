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
import { AboutMe } from './pages/blog/about-me/page';
import { PostEdit } from './pages/blog/post-edit/page';
import { PostUpload } from './pages/blog/post-upload/page';

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
            path='post-upload'
            element={<PostUpload />}
          />
          <Route
            path='post-edit'
            element={<PostEdit />}
          />
          <Route
            path='about-me'
            element={<AboutMe />}
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
