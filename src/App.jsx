import React, { Component } from 'react';
import Routes from './Routes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategories } from './services/category.service';
import { fetchTags } from './services/tag.service';
import { loadCategories } from './redux/category/actions';
import { loadTags } from './redux/tag/actions';
import { blog } from './mock/data';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {

  fetchAllCategories = async () => {
    const fetchCategoriesResponse = await fetchCategories();
    const categories = fetchCategoriesResponse.data.data.categories;
    this.props.onLoadCategories(categories);
  }

  fetchAllTags = async () => {
    const fetchTagsResponse = await fetchTags();
    const tags = fetchTagsResponse.data.data.tags;
    this.props.onLoadTags(tags);
  }

  componentDidMount = () => {
    this.fetchAllCategories();
    this.fetchAllTags();
  }

  render = () => {
    return (
      <div className="app">
        <Header blogInfo={blog.info} menuItems={blog.menuItems} />
        <Routes />
        <Footer blogInfo={blog.info} />
      </div>
    );
  }

}

App.propTypes = {
  onLoadCategories: PropTypes.func.isRequired,
  onLoadTags: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onLoadCategories: (categories) => {
    dispatch(loadCategories(categories));
  },
  onLoadTags: (tags) => {
    dispatch(loadTags(tags));
  }
});

export default connect(null, mapDispatchToProps)(App);
