import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import InitializationPage from './components/InitializationPage';
import PostPage from './components/PostPage';
import EditorPage from './components/EditorPage';

import { blog } from './mock/data';

const homePage = () => (<HomePage posts={blog.posts} categories={blog.categories} tags={blog.tags} />);
const postPage = () => (<PostPage post={blog.posts[0]} />);
const editorPage = () => (<EditorPage />);

const Routes = () => (
  <BrowserRouter>
    <div>
      <Route path='/' exact component={homePage} />
      <Route path='/initialize' component={InitializationPage} />
      <Route path='/post/' component={postPage} />
      <Route path='/editor' component={editorPage} />
    </div>
  </BrowserRouter>
);

export default Routes;
