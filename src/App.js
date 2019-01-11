import React, { Component } from 'react';
// import logo from './logo.svg';
import { blog } from './mock/data';
import Header from './components/header/header.component';
import Container from './components/container/container.component';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Header blogInfo={blog.info} menuItems={blog.menuItems} />
        <Container posts={blog.posts} categories={blog.categories} tags={blog.tags} />
      </div>
    );
  }
}

export default App;
