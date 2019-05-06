import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from './Post';
import terms from '../config/terms';

class PostCollection extends Component {
  render = () => {
    const { data, newerHandler, olderHandler, noNewer, noOlder } = this.props;
    if (data === undefined || data.lenth === 0)
    {
      return;
    }
    const posts = data.map((post, index) =>
      <Post data={post} isCompact={true} key={index} />
    );
    return (
      <article className='post-collection'>
        {posts}
        <nav className='article-nav-group'>
          <a href='#/' className={noNewer ? "disabled": ""} onClick={newerHandler}>{terms.label.newer}</a>
          <a href='#/' className={noOlder ? "disabled": ""} onClick={olderHandler}>{terms.label.older}</a>
        </nav>
      </article>
    );
  }
}

PostCollection.propTypes = {
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
  newerHandler: PropTypes.func.isRequired,
  olderHandler: PropTypes.func.isRequired,
  noNewer: PropTypes.bool,
  noOlder: PropTypes.bool
}

export default connect()(PostCollection);
