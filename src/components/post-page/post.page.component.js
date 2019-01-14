import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PostPage extends Component {
  render = () => {
    // const { post } = this.props;
    return (
      <div className="container">
        <article>
          single post here
        </article>
        <aside>
          header list
        </aside>
      </div>
    );
  };
}

PostPage.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    createTime: PropTypes.string,
    postTime: PropTypes.string,
    updateTime: PropTypes.string,
    content: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string)
  })
}

export default connect()(PostPage);
