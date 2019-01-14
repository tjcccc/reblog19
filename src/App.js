import React, { Component } from 'react';
import Routes from './Routes';
import { blog } from './mock/data';
import Header from './components/Header';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Header blogInfo={blog.info} menuItems={blog.menuItems} />
        <Routes />
      </div>
    );
  }
}

export default App;
