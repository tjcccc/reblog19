import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import links from './config/links';

import HomePage from './components/HomePage';
import InitializationPage from './components/InitializationPage';
import LoginPage from './components/LoginPage';
import SettingPage from './components/SettingPage';
import PostPage from './components/PostPage';
import EditorPage from './components/EditorPage';

const homePage = () => (<HomePage />);
const initializationPage = () => (<InitializationPage />);
const loginPage = () => (<LoginPage />);
const settingPage = () => (<SettingPage />);
const postPage = (routeData) => (<PostPage routeData={routeData} />);
const editorPage = (routeData) => (<EditorPage routeData={routeData} />);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Redirect from={links.index} to={links.default} exact />
      <Route exact path={links.default} component={homePage} />
      <Route path={links.home} component={homePage} />
      <Route path={links.initialize} component={initializationPage} />
      <Route path={links.login} component={loginPage} />
      <Route path={links.setting} component={settingPage} />
      <Route exact path={links.post} component={postPage} />
      <Route exact path={links.editPost} component={editorPage} />
      <Route exact path={links.createPost} component={editorPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
