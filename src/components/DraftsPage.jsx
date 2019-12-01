import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PostListItem from '../components/PostListItem';
import Chronicle from '../components/Chronicle';
import { fetchPostsByDate } from '../services/post.service';
import months from '../config/months';
import { hostBasename } from '../server-config';
// import logger from '../utilities/logger';
// import terms from '../config/terms';

class DraftsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      year: 0,
      monthId: 0
    }
  }

  displayName = 'DraftsPage';

  fetchRecentPosts = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const postsResponse = await fetchPostsByDate(year, month, 0, 0);
    let posts = postsResponse.data.data.postsByDate;
    posts = posts === undefined || posts === null ? [] : posts;

    this.setState({
      posts: posts,
      year: year,
      monthId: month
    });
  };

  fetchPostsByChronicle = async (year, month) => {
    const postsResponse = await fetchPostsByDate(year, month, 0, 0);
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
      <BrowserRouter basename={hostBasename} forceRefresh={true}>
        <div className='container'>
          <article className='post-single'>
            <h2>Drafts of {monthName} {year}</h2>
            <ul className='post-list'>
              {postList}
            </ul>
          </article>
          <aside className='date-list'>
            <Chronicle firstYear={2014} fetchPosts={this.fetchPostsByChronicle} />
          </aside>
        </div>
      </BrowserRouter>
    );
  };

}

export default connect()(DraftsPage);
