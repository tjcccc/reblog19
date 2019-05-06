import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaRss } from 'react-icons/fa'
import PostCollection from './PostCollection';
import CategoryCollection from './CategoryCollection';
import TagCollection from './TagCollection';
import terms from '../config/terms';
import { fetchPosts } from '../services/post.service';
import { loadPosts } from '../redux/post/actions';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.config = {
      pageIndex: 0,
      postsPerPage: 5
    }

    this.state = {
      noNewer: true,
      noOlder: false
    }
  }

  fetchRecentPosts = async () => {
    const skip = this.config.pageIndex * this.config.postsPerPage;
    const limit = this.config.postsPerPage;
    const response = await fetchPosts(skip, limit);
    const posts = response.data.data.posts;
    this.props.onLoadPosts(posts);
    this.setState({
      noNewer: this.config.pageIndex === 0,
      noOlder: posts.length === undefined || posts.length !== limit
    });
  }

  fetchNewerPosts = () => {
    this.config.pageIndex = this.config.pageIndex - 1 < 0 ? 0 : this.config.pageIndex - 1;
    this.fetchRecentPosts();
  }

  fetchOlderPosts = () => {
    this.config.pageIndex += 1;
    this.fetchRecentPosts();
  }

  componentDidMount = () => {
    this.fetchRecentPosts();
  }

  render = () => {
    const { posts, categories, tags } = this.props;
    return (
      <div className='container responsive-container'>
        <PostCollection
          data={posts}
          newerHandler={this.fetchNewerPosts}
          olderHandler={this.fetchOlderPosts}
          noNewer={this.state.noNewer}
          noOlder={this.state.noOlder} />
        <aside>
          <CategoryCollection categories={categories} />
          <TagCollection tags={tags} />
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
    _id: PropTypes.string,
    order_id: PropTypes.number,
    label: PropTypes.string,
    count: PropTypes.number
  })),
  tags: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    label: PropTypes.string,
    count: PropTypes.number
  })),
  onLoadPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  categories: state.category.categories,
  tags: state.tag.tags
});

const mapDispatchToProps = (dispatch) => ({
  onLoadPosts: (posts) => {
    dispatch(loadPosts(posts));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
