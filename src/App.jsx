import React, { Component } from 'react';
import Routes from './Routes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { fetchConfig } from './services/config.service';
import { fetchCategories } from './services/category.service';
import { fetchTags } from './services/tag.service';
import { loadCategories } from './redux/category/actions';
import { loadTags } from './redux/tag/actions';
import headerMenu from './config/header-menu';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogName: '',
      authorName: ''
    }
  }

  fetchBlogConfig = async () => {
    const configResponse = await fetchConfig();
    if (configResponse.status !== 200) {
      return;
    }
    const config = configResponse.data.data.config;
    this.setState({
      blogName: config.blog_name,
      authorName: config.author_name
    })
  };

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
    this.fetchBlogConfig();
    this.fetchAllCategories();
    this.fetchAllTags();
  }

  helmetContext = {};

  render = () => {
    const { blogName, authorName } = this.state;
    // const title = `${authorName}${blogName === '' ? '' : ': '}${blogName}`;
    const authorInfo = authorName !== '' ? ` (by ${authorName})` : '';
    const title = `${blogName}${authorInfo}`
    const blogInfo = {
      name: blogName,
      author: authorName
    }
    return (
      <HelmetProvider context={this.helmetContext}>
        <div className="app">
            <Helmet>
              <meta charSet='utf-8' />
              <title>{title}</title>
            </Helmet>
            <Header blogInfo={blogInfo} menuItems={headerMenu.items} />
            <Routes />
            <Footer blogInfo={blogInfo} />
          </div>
      </HelmetProvider>
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
