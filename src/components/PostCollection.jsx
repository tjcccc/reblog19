import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from './Post';
import { fetchPosts, fetchPostsByCategory, fetchPostsByTag } from '../services/post.service';
import terms from '../config/terms';

class PostCollection extends Component {
  constructor(props) {
    super(props);

    this.pagenation = {
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
    const skip = this.pagenation.index * postsPerPage;
    const limit = postsPerPage;

    let posts;

    if (listCategoryId !== undefined && listCategoryId !== '') {
      const postsResponse = await fetchPostsByCategory(skip, limit, listCategoryId, 1);
      posts = postsResponse.data.data.postsByCategory;
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
      noNewer: this.pagenation.index === 0,
      noOlder: posts.length === 0 || posts.length !== limit
    });
  };

  fetchNewerPosts = () => {
    this.pagenation.index = this.pagenation.index - 1 < 0 ? 0 : this.pagenation.index - 1;
    this.fetchRecentPosts();
  };

  fetchOlderPosts = () => {
    this.pagenation.index += 1;
    this.fetchRecentPosts();
  };

  componentDidMount = () => {
    this.fetchRecentPosts();
  };

  componentDidUpdate = (prevProps) => {
    // TODO: Better Logic.
    if ((prevProps.listCategoryId !== this.props.listCategoryId && this.props.listTagId === '')
      || (prevProps.listTagId !== this.props.listTagId && this.props.listCategoryId === '')) {
      this.fetchRecentPosts();
      this.pagenation.index = 0;
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
          <a href='#/' className={noNewer ? "disabled": ""} onClick={this.fetchNewerPosts}>{terms.label.newer}</a>
          <a href='#/' className={noOlder ? "disabled": ""} onClick={this.fetchOlderPosts}>{terms.label.older}</a>
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
