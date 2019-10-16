import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../services/post.service';
import PostListItem from '../components/PostListItem';
import Chronicle from '../components/Chronicle';
import terms from '../config/terms';

class ArchivePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
  }

  displayName = 'ArchivePage';

  fetchRecentPosts = async () => {
    const skip = 0;
    const limit = 0;

    const postsResponse = await fetchPosts(skip, limit);
    let posts = postsResponse.data.data.posts;
    posts = posts === undefined || posts === null ? [] : posts;

    this.setState({
      posts: posts
    });
  };

  componentDidMount = () => {
    this.fetchRecentPosts();
  };

  render = () => {
    const { posts } = this.state;

    if (posts === undefined || posts.length === 0) {
      return (<article className='post-collection'><h4>No Post.</h4></article>);
    }

    const postList = posts.map((post, index) =>
      <PostListItem key={index} data={post} />
    );

    return (
      <div className='container'>
        <article className='post-single'>
          <h2>Archive of 2019-07</h2>
          <ul className='post-list'>
            {postList}
          </ul>
        </article>
        <aside className='date-list'>
          <Chronicle firstYear={2014} />
        </aside>
      </div>
    );
  };

}

export default connect()(ArchivePage);
