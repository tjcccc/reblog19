import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostListItem from '../components/PostListItem';
import Chronicle from '../components/Chronicle';
import { fetchPostsByDate } from '../services/post.service';
import months from '../config/months';
// import logger from '../utilities/logger';
// import terms from '../config/terms';

class ArchivePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      year: 0,
      monthId: 0
    }
  }

  displayName = 'ArchivePage';

  fetchRecentPosts = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const postsResponse = await fetchPostsByDate(year, month, 0, 1);
    let posts = postsResponse.data.data.postsByDate;
    posts = posts === undefined || posts === null ? [] : posts;

    this.setState({
      posts: posts,
      year: year,
      monthId: month
    });
  };

  fetchPostsByChronicle = async (year, month) => {
    const postsResponse = await fetchPostsByDate(year, month, 0, 1);
    const fetchedPosts = postsResponse.data.data.postsByDate;
    this.setState({
      posts: fetchedPosts,
      year: year,
      monthId: month
    })
  };

  componentDidMount = () => {
    this.fetchRecentPosts();
  };

  render = () => {
    const { posts, year, monthId } = this.state;

    const month = months.find(m => m.id === parseInt(monthId));
    const monthName = month !== undefined ? month.name : '(Unknown month)';

    if (posts === undefined || posts.length === 0) {
      return (
        <div className='container'>
          <article className='post-collection'>
            <h2>Archive of {monthName} {year}</h2>
            <ul className='post-list'>
              <h4>No Post.</h4>
            </ul>
          </article>
          <aside className='date-list'>
            <Chronicle firstYear={2014} fetchPosts={this.fetchPostsByChronicle} />
          </aside>
        </div>
      );
    }

    const postList = posts.map((post, index) =>
      <PostListItem key={index} data={post} />
    );

    return (
      <div className='container'>
        <article className='post-single'>
          <h2>Archive of {monthName} {year}</h2>
          <ul className='post-list'>
            {postList}
          </ul>
        </article>
        <aside className='date-list'>
          <Chronicle firstYear={2014} fetchPosts={this.fetchPostsByChronicle} />
        </aside>
      </div>
    );
  };

}

export default connect()(ArchivePage);
