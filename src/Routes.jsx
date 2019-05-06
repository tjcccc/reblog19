import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import links from './config/links';

import HomePage from './components/HomePage';
import InitializationPage from './components/InitializationPage';
import LoginPage from './components/LoginPage';
import SettingPage from './components/SettingPage';
import PostPage from './components/PostPage';
import EditorPage from './components/EditorPage';

import { blog } from './mock/data';

const homePage = () => (<HomePage />);
const initializationPage = () => (<InitializationPage />);
const loginPage = () => (<LoginPage />);
const settingPage = () => (<SettingPage />);
const postPage = () => (<PostPage post={blog.posts[0]} />);
const editorPage = () => (<EditorPage isNew={true} />);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Redirect from={links.index} to={links.default} exact />
      <Route path={links.default} exact component={homePage} />
      <Route path={links.home} component={homePage} />
      <Route path={links.initialize} component={initializationPage} />
      <Route path={links.login} component={loginPage} />
      <Route path={links.setting} component={settingPage} />
      <Route path={links.post} component={postPage} />
      <Route path={links.editor} component={editorPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
