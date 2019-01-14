import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './components/home-page/home.page.component';
import PostPage from './components/post-page/post.page.component';

import { blog } from './mock/data';

const Page = {
  Home: () => (<HomePage posts={blog.posts} categories={blog.categories} tags={blog.tags} />),
  Post: () => (<PostPage />)
}

const Routes = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Page.Home} />
      <Route path="/post/" component={Page.Post} />
    </div>
  </BrowserRouter>
);

export default Routes;
