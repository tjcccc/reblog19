import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostListItem from '../components/PostListItem';
import Chronicle from '../components/Chronicle';
import { fetchPostsByDate } from '../services/post.service';
// import terms from '../config/terms';

class ArchivePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
  }

  displayName = 'ArchivePage';

  fetchRecentPosts = async () => {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;

    const postsResponse = await fetchPostsByDate(year, month);
    let posts = postsResponse.data.data.postsByDate;
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
