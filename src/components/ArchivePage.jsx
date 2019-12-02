import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PostListItem from '../components/PostListItem';
import Chronicle from '../components/Chronicle';
import UserPanel from './UserPanel';
import { fetchPostsByDate } from '../services/post.service';
import { reversedMonths } from '../config/months';
import { hostBasename } from '../server-config';
import { navButtonId, triggerButtonNav } from '../config/bottom-nav';
import converter from '../utilities/converter';
// import logger from '../utilities/logger';
// import terms from '../config/terms';

class ArchivePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      year: 0,
      monthId: 0,
      bottomNavId: ''
    }
  }

  displayName = 'ArchivePage';

  fetchRecentPosts = async () => {
    const { status } = this.props;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const postsResponse = await fetchPostsByDate(year, month, 0, status);
    let posts = postsResponse.data.data.postsByDate;
    posts = posts === undefined || posts === null ? [] : posts;

    this.setState({
      posts: posts,
      year: year,
      monthId: month
    });
  };

  fetchPostsByChronicle = async (year, month, status) => {
    const postsResponse = await fetchPostsByDate(year, month, 0, parseInt(status));
    const fetchedPosts = postsResponse.data.data.postsByDate;
    this.setState({
      posts: fetchedPosts,
      year: year,
      monthId: month
    })
  };

  fetchPostsBySelectingMonth = async (monthId, status) => {
    const { year } = this.state;
    const postsResponse = await fetchPostsByDate(year, parseInt(monthId), 0, parseInt(status));
    const fetchedPosts = postsResponse.data.data.postsByDate;
    this.setState({
      posts: fetchedPosts,
      monthId: monthId,
      bottomNavId: ''
    })
  };

  fetchPostsBySelectingYear = async (year, status) => {
    const { monthId } = this.state;
    const postsResponse = await fetchPostsByDate(parseInt(year), monthId, 0, parseInt(status));
    const fetchedPosts = postsResponse.data.data.postsByDate;
    this.setState({
      posts: fetchedPosts,
      year: year,
      bottomNavId: ''
    })
  };

  componentDidMount = () => {
    this.fetchRecentPosts();
  };

  render = () => {
    const { title, status } = this.props;
    const { posts, year, monthId, bottomNavId } = this.state;

    const month = reversedMonths.find(m => m.id === parseInt(monthId));
    const monthName = month !== undefined ? month.name : '(Unknown month)';
    const postList = (posts === undefined || posts.length === 0) ? (<h4>No Post.</h4>) : posts.map((post, index) =>
      <PostListItem key={index} data={post} />
    );
    const bottomMonthList = reversedMonths.map((month, index) =>
      <button key={index} onClick={() => this.fetchPostsBySelectingMonth(month.id, status)}>{month.name}</button>
    );
    const currentYear = (new Date()).getFullYear();
    const years = converter.getRange(2014, currentYear + 1).reverse();
    const bottmYearList = years.map((year, index) =>
      <button key={index} onClick={() => this.fetchPostsBySelectingYear(year, status)}>{year}</button>
    );

    return (
      <BrowserRouter basename={hostBasename} forceRefresh={true}>
        <div className='container'>
          <article className='post-single'>
            <h2>{title} of {monthName} {year}</h2>
            <ul className='post-list'>
              {postList}
            </ul>
          </article>
          <aside className='date-list'>
            <Chronicle firstYear={2014} fetchPosts={this.fetchPostsByChronicle} statusForPost={status} />
          </aside>
          <div className={bottomNavId !== '' ? 'bottom-menu' : 'hide'}>
            <div id={navButtonId.userMenu} className={bottomNavId === navButtonId.userMenu ? 'bottom-menu-section' : 'hide'}><UserPanel /></div>
            <div id={navButtonId.month} className={bottomNavId === navButtonId.month ? 'bottom-menu-section' : 'hide'}><nav>{bottomMonthList}</nav></div>
            <div id={navButtonId.year} className={bottomNavId === navButtonId.year ? 'bottom-menu-section' : 'hide'}><nav>{bottmYearList}</nav></div>
          </div>
          <nav className={bottomNavId !== '' ? 'bottom-nav' : 'bottom-nav bottom-shadow'}>
            <button id={navButtonId.userMenu} className={bottomNavId === navButtonId.userMenu ? 'selected' : ''} onClick={event => triggerButtonNav(this, event)}>{navButtonId.userMenu}</button>
            <button id={navButtonId.month} className={bottomNavId === navButtonId.month ? 'selected' : ''} onClick={event => triggerButtonNav(this, event)}>{navButtonId.month}</button>
            <button id={navButtonId.year} className={bottomNavId === navButtonId.year ? 'selected' : ''} onClick={event => triggerButtonNav(this, event)}>{navButtonId.year}</button>
          </nav>
        </div>
      </BrowserRouter>
    );
  };

}

ArchivePage.propTypes = {
  title: PropTypes.string,
  status: PropTypes.number
}

export default connect()(ArchivePage);
