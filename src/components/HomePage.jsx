import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaRss } from 'react-icons/fa'
import PostCollection from './PostCollection';
import CategoryCollection from './CategoryCollection';
import TagCollection from './TagCollection';
import terms from '../config/terms';
import { fetchPosts } from '../services/post.service';
import logger from '../utilities/logger';
import { blog } from '../mock/data';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.config = {
      pageIndex: 0,
      postsPerPage: 5
    }

    this.state = {
      recentPosts: [],
      noNewer: true,
      noOlder: false
    }
  }

  fetchRecentPosts = async () => {
    const skip = this.config.pageIndex * this.config.postsPerPage;
    const limit = this.config.postsPerPage;
    const response = await fetchPosts(skip, limit);
    const posts = response.data.data.posts;
    this.setState({
      recentPosts: posts,
      noNewer: this.config.pageIndex === 0,
      noOlder: posts.length !== limit
    });
  }

  fetchNewerPosts = () => {
    this.config.pageIndex = this.config.pageIndex - 1 < 0 ? 0 : this.config.pageIndex - 1;
    this.fetchRecentPosts();
    logger.trace(this.state.recentPosts);
  }

  fetchOlderPosts = () => {
    this.config.pageIndex += 1;
    this.fetchRecentPosts();
    logger.trace(this.state.recentPosts);
  }

  componentDidMount = () => {
    this.fetchRecentPosts();
  }

  test = () => {
    this.setState({
      recentPosts: blog.posts
    })
  }

  render = () => {
    const { categories, tags } = this.props;

    return (
      <div className='container responsive-container'>
        <PostCollection
          data={this.state.recentPosts}
          newerHandler={this.fetchNewerPosts}
          olderHandler={this.fetchOlderPosts}
          noNewer={this.state.noNewer}
          noOlder={this.state.noOlder} />
        <aside>
          <CategoryCollection categories={categories} selectedId='bbb' />
          <TagCollection items={tags} />
          <p className='aside-option'>
            <FaRss />
            <a href='/'>{terms.label.subscribe}</a>
          </p>
        </aside>
      </div>
    );
  };
}

HomePage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    createTime: PropTypes.string,
    postTime: PropTypes.string,
    updateTime: PropTypes.string,
    content: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string)
  })),
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    postCount: PropTypes.number
  })),
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    postCount: PropTypes.number
  }))
}

export default connect()(HomePage);
