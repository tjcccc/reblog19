import React, { Component } from 'react';
// import logo from './logo.svg';
import { blog } from './mock/data';
import Header from './components/header/header.component';

class App extends Component {

  render() {
    return (
      <Header blog={blog} />
    );
  }
}

export default App;
