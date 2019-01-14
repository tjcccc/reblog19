import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import PostPage from './components/PostPage';

import { blog } from './mock/data';

const homePage = () => (<HomePage posts={blog.posts} categories={blog.categories} tags={blog.tags} />);
const postPage = () => (<PostPage post={blog.posts[0]} />);

const Routes = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={homePage} />
      <Route path="/post/" component={postPage} />
    </div>
  </BrowserRouter>
);

export default Routes;
