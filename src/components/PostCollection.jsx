import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from './Post';

class PostCollection extends Component {
  render = () => {
    const { data, count } = this.props;
    const posts = data.slice(0, count).map((post, index) =>
      <Post data={post} isCompact={true} key={index} />
    );
    return (
      <article className='post-collection'>
        {posts}
        <nav className='article-nav-group'>
          <a className='disabled' href='/'>Newer</a>
          <a href='/'>Older</a>
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
  count: PropTypes.number
}

export default connect()(PostCollection);
