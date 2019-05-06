import React, { Component } from 'react';
import Routes from './Routes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategories } from './services/category.service';
import { loadCategories } from './redux/category/actions';
import { blog } from './mock/data';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {

  render = () => {
    return (
      <div className="app">
        <Header blogInfo={blog.info} menuItems={blog.menuItems} />
        <Routes />
        <Footer blogInfo={blog.info} />
      </div>
    );
  }

  componentDidMount = async () => {
    const feitchCategoriesResponse = await fetchCategories();
    this.props.onLoadCategories(feitchCategoriesResponse.data.data.categories);
  }

}

App.propTypes = {
  onLoadCategories: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onLoadCategories: (categories) => {
    dispatch(loadCategories(categories));
  }
});

export default connect(null, mapDispatchToProps)(App);
