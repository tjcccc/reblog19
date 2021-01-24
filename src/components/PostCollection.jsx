import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from './Post';
import { fetchPosts, fetchPostsByCategory, fetchPostsWithNoCategory, fetchPostsByTag } from '../services/post.service';
import terms from '../config/terms';

class PostCollection extends Component {
  constructor(props) {
    super(props);

    this.pagination = {
      index: 0
    }

    this.state = {
      posts: [],
      noNewer: true,
      noOlder: false
    }
  }

  fetchRecentPosts = async () => {
    const { postsPerPage, listCategoryId, listTagId } = this.props;
    const skip = this.pagination.index * postsPerPage;
    const limit = postsPerPage;
    const isUncategorized = listCategoryId === terms.label.uncategorized;

    let posts;

    if (listCategoryId !== undefined && listCategoryId !== '') {
      const postsResponse = isUncategorized ?
        await fetchPostsWithNoCategory(skip, limit, 1) :
        await fetchPostsByCategory(skip, limit, listCategoryId, 1);

      posts = isUncategorized ? postsResponse.data.data.postsWithNoCategory : postsResponse.data.data.postsByCategory;
    } else if (listTagId !== undefined && listTagId !== '') {
      const postsResponse = await fetchPostsByTag(skip, limit, listTagId, 1);
      posts = postsResponse.data.data.postsByTag;
    } else {
      const postsResponse = await fetchPosts(skip, limit, 1);
      posts = postsResponse.data.data.posts;
    }

    posts = posts === undefined || posts === null ? [] : posts;

    this.setState({
      posts: posts,
      noNewer: this.pagination.index === 0,
      noOlder: posts.length === 0 || posts.length !== limit
    });
  };

  goPageTop() {
    if (typeof document === `undefined`) {
      return;
    }

    // For Safari
    // eslint-disable-next-line no-undef
    document.body.scrollTop = 0;

    // For Chrome, Firefox, IE and Opera
    // eslint-disable-next-line no-undef
    document.documentElement.scrollTop = 0;
  }

  fetchNewerPosts = () => {
    this.pagination.index = this.pagination.index - 1 < 0 ? 0 : this.pagination.index - 1;
    this.fetchRecentPosts();
    this.goPageTop();

  };

  fetchOlderPosts = () => {
    this.pagination.index += 1;
    this.fetchRecentPosts();
    this.goPageTop();
  };

  componentDidMount = () => {
    this.fetchRecentPosts();
  };

  componentDidUpdate = (prevProps) => {
    // TODO: Better Logic.
    if ((prevProps.listCategoryId !== this.props.listCategoryId && this.props.listTagId === '')
      || (prevProps.listTagId !== this.props.listTagId && this.props.listCategoryId === '')) {
      this.fetchRecentPosts();
      this.pagination.index = 0;
    }
  };

  render = () => {
    const { posts, noNewer, noOlder } = this.state;

    if (posts === undefined || posts.length === 0) {
      return (<article className='post-collection'><h4>No Post.</h4></article>);
    }

    const postList = posts.map((post, index) =>
      <Post data={post} isCompact={true} key={index} />
    );

    return (
      <article className='post-collection'>
        {postList}
        <nav className='article-nav-group'>
          <button className={noNewer ? "disabled": ""} onClick={this.fetchNewerPosts}>{terms.label.newer}</button>
          <button className={noOlder ? "disabled": ""} onClick={this.fetchOlderPosts}>{terms.label.older}</button>
        </nav>
      </article>
    );
  }
}

PostCollection.propTypes = {
  postsPerPage: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    createTime: PropTypes.string,
    postTime: PropTypes.string,
    updateTime: PropTypes.string,
    content: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string)
  })),
  isCompact: PropTypes.bool,
  noNewer: PropTypes.bool,
  noOlder: PropTypes.bool,
  listCategoryId: PropTypes.string,
  listTagId: PropTypes.string
}

const mapStateToProps = state => ({
  listCategoryId: state.post.listCategoryId,
  listTagId: state.post.listTagId
});

export default connect(mapStateToProps)(PostCollection);
